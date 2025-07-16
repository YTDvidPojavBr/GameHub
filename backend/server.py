from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime
from bson import ObjectId


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class Game(BaseModel):
    id: Optional[str] = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    image: str
    downloadLink: str
    category: str
    clicks: int = 0
    dateAdded: datetime = Field(default_factory=datetime.utcnow)

class GameCreate(BaseModel):
    title: str
    description: str
    image: str
    downloadLink: str
    category: str

class GameUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    image: Optional[str] = None
    downloadLink: Optional[str] = None
    category: Optional[str] = None

class DownloadClick(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    gameId: str
    gameTitle: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class Stats(BaseModel):
    totalGames: int
    totalDownloads: int
    topGame: dict
    recentActivity: List[dict]

class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

# Helper function to convert ObjectId to string
def convert_objectid(obj):
    if isinstance(obj, ObjectId):
        return str(obj)
    return obj

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "GameHub API is running"}

# Game routes
@api_router.get("/games", response_model=List[Game])
async def get_games():
    games = await db.games.find().to_list(1000)
    for game in games:
        if '_id' in game:
            del game['_id']
    return [Game(**game) for game in games]

@api_router.post("/games", response_model=Game)
async def create_game(game_data: GameCreate):
    game_dict = game_data.dict()
    game_obj = Game(**game_dict)
    result = await db.games.insert_one(game_obj.dict())
    return game_obj

@api_router.put("/games/{game_id}", response_model=Game)
async def update_game(game_id: str, game_data: GameUpdate):
    # Find the game
    game = await db.games.find_one({"id": game_id})
    if not game:
        raise HTTPException(status_code=404, detail="Game not found")
    
    # Update with new data
    update_data = {k: v for k, v in game_data.dict().items() if v is not None}
    if update_data:
        await db.games.update_one({"id": game_id}, {"$set": update_data})
    
    # Return updated game
    updated_game = await db.games.find_one({"id": game_id})
    if '_id' in updated_game:
        del updated_game['_id']
    return Game(**updated_game)

@api_router.delete("/games/{game_id}")
async def delete_game(game_id: str):
    result = await db.games.delete_one({"id": game_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Game not found")
    
    # Also delete related download clicks
    await db.download_clicks.delete_many({"gameId": game_id})
    
    return {"message": "Game deleted successfully"}

@api_router.post("/games/{game_id}/download")
async def increment_download(game_id: str):
    # Find the game
    game = await db.games.find_one({"id": game_id})
    if not game:
        raise HTTPException(status_code=404, detail="Game not found")
    
    # Increment click counter
    await db.games.update_one({"id": game_id}, {"$inc": {"clicks": 1}})
    
    # Record the download click
    click_data = DownloadClick(
        gameId=game_id,
        gameTitle=game['title']
    )
    await db.download_clicks.insert_one(click_data.dict())
    
    return {"message": "Download count incremented"}

@api_router.get("/stats", response_model=Stats)
async def get_stats():
    # Get all games
    games = await db.games.find().to_list(1000)
    
    # Calculate stats
    total_games = len(games)
    total_downloads = sum(game.get('clicks', 0) for game in games)
    
    # Find top game
    top_game = max(games, key=lambda g: g.get('clicks', 0)) if games else None
    top_game_data = {
        "title": top_game.get('title', 'N/A') if top_game else 'N/A',
        "clicks": top_game.get('clicks', 0) if top_game else 0
    }
    
    # Get recent activity (last 10 download clicks)
    recent_clicks = await db.download_clicks.find().sort("timestamp", -1).limit(10).to_list(10)
    
    # Group recent clicks by game
    activity_map = {}
    for click in recent_clicks:
        game_title = click['gameTitle']
        if game_title not in activity_map:
            activity_map[game_title] = {
                "game": game_title,
                "clicks": 0,
                "timestamp": click['timestamp']
            }
        activity_map[game_title]['clicks'] += 1
    
    recent_activity = list(activity_map.values())[:5]
    
    return Stats(
        totalGames=total_games,
        totalDownloads=total_downloads,
        topGame=top_game_data,
        recentActivity=recent_activity
    )

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
