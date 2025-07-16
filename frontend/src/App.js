import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import GameCard from './components/GameCard';
import CategoryFilter from './components/CategoryFilter';
import AdminPanel from './components/AdminPanel';
import StatsPanel from './components/StatsPanel';
import GameDetails from './components/GameDetails';
import { gameService } from './services/gameService';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner';

const categories = [
  'Todos',
  'RPG',
  'Ação',
  'FPS',
  'Aventura',
  'Estratégia',
  'Esporte',
  'Corrida',
  'Simulação'
];

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [games, setGames] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedGame, setSelectedGame] = useState(null);
  const [stats, setStats] = useState({
    totalGames: 0,
    totalDownloads: 0,
    topGame: { title: 'N/A', clicks: 0 },
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);

  // Load games on component mount
  useEffect(() => {
    loadGames();
  }, []);
useEffect(() => {
  const adminStatus = localStorage.getItem("admin");
  if (adminStatus === "true") {
    setIsAdmin(true);
  }
}, []);
  // Load games from API
  const loadGames = async () => {
    try {
      setLoading(true);
      const gamesData = await gameService.getAllGames();
      setGames(gamesData);
      await loadStats();
    } catch (error) {
      toast.error('Erro ao carregar jogos', {
        description: 'Não foi possível carregar a lista de jogos'
      });
    } finally {
      setLoading(false);
    }
  };

  // Load statistics
  const loadStats = async () => {
    try {
      const statsData = await gameService.getStats();
      setStats(statsData);
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  // Filter games by category
  const filteredGames = selectedCategory === 'Todos' 
    ? games 
    : games.filter(game => game.category === selectedCategory);

  // Handle navigation
  const handleNavigation = (page) => {
    setCurrentPage(page);
    setSelectedGame(null);
  };

  // Handle game download (increment click counter)
  const handleDownload = async (game) => {
    try {
      await gameService.incrementDownload(game.id);
      
      // Update local state
      setGames(prevGames => 
        prevGames.map(g => 
          g.id === game.id 
            ? { ...g, clicks: g.clicks + 1 }
            : g
        )
      );
      
      // Reload stats
      await loadStats();
      
      // Open download link
      window.open(game.downloadLink, '_blank');
      
      // Show success toast
      toast.success(`Download iniciado: ${game.title}`, {
        description: 'O link foi aberto em uma nova aba'
      });
    } catch (error) {
      toast.error('Erro ao processar download', {
        description: 'Tente novamente mais tarde'
      });
    }
  };

  // Handle game details view
  const handleViewDetails = (game) => {
    setSelectedGame(game);
    setCurrentPage('details');
  };

  // Handle add new game
  const handleAddGame = async (gameData) => {
    try {
      const newGame = await gameService.createGame(gameData);
      setGames(prevGames => [newGame, ...prevGames]);
      await loadStats();
      
      toast.success('Jogo adicionado com sucesso!', {
        description: `${gameData.title} foi adicionado à biblioteca`
      });
    } catch (error) {
      toast.error('Erro ao adicionar jogo', {
        description: 'Verifique os dados e tente novamente'
      });
    }
  };

  // Handle update game
  const handleUpdateGame = async (gameId, updatedData) => {
    try {
      const updatedGame = await gameService.updateGame(gameId, updatedData);
      setGames(prevGames =>
        prevGames.map(game =>
          game.id === gameId ? updatedGame : game
        )
      );
      
      toast.success('Jogo atualizado com sucesso!', {
        description: 'As alterações foram salvas'
      });
    } catch (error) {
      toast.error('Erro ao atualizar jogo', {
        description: 'Tente novamente mais tarde'
      });
    }
  };

  // Handle delete game
  const handleDeleteGame = async (gameId) => {
    try {
      await gameService.deleteGame(gameId);
      setGames(prevGames => prevGames.filter(game => game.id !== gameId));
      await loadStats();
      
      toast.success('Jogo removido com sucesso!', {
        description: 'O jogo foi removido da biblioteca'
      });
    } catch (error) {
      toast.error('Erro ao remover jogo', {
        description: 'Tente novamente mais tarde'
      });
    }
  };

  // Calculate total downloads
  const totalDownloads = games.reduce((sum, game) => sum + game.clicks, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Carregando jogos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <Header 
        onNavigate={handleNavigation}
        currentPage={currentPage}
        totalGames={games.length}
        totalDownloads={totalDownloads}
      />
      
      <main className="container mx-auto px-4 py-8">
        {currentPage === 'home' && (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                Jogos para PC
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Descubra e baixe os melhores jogos para PC. Biblioteca sempre atualizada com os lançamentos mais recentes.
              </p>
            </div>
            
            <CategoryFilter 
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              gameCount={filteredGames.length}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGames.map(game => (
                <GameCard 
                  key={game.id}
                  game={game}
                  onDownload={handleDownload}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
            
            {filteredGames.length === 0 && (
              <div className="text-center py-16">
                <h3 className="text-gray-400 text-xl">
                  {games.length === 0 ? 'Nenhum jogo cadastrado ainda' : 'Nenhum jogo encontrado nesta categoria'}
                </h3>
                <p className="text-gray-500 mt-2">
                  {games.length === 0 ? 'Adicione alguns jogos no painel administrativo' : 'Tente selecionar outra categoria'}
                </p>
              </div>
            )}
          </div>
        )}
        
        {currentPage === 'admin' && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold text-white">Painel Administrativo</h1>
              <p className="text-gray-400">Gerencie os jogos da biblioteca</p>
            </div>
            
            <AdminPanel 
              games={games}
              onAddGame={handleAddGame}
              onUpdateGame={handleUpdateGame}
              onDeleteGame={handleDeleteGame}
            />
          </div>
        )}
        
        {currentPage === 'stats' && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold text-white">Estatísticas</h1>
              <p className="text-gray-400">Acompanhe o desempenho dos downloads</p>
            </div>
            
            <StatsPanel 
              games={games}
              stats={stats}
            />
          </div>
        )}
        
        {currentPage === 'details' && selectedGame && (
          <GameDetails 
            game={selectedGame}
            onBack={() => setCurrentPage('home')}
            onDownload={handleDownload}
          />
        )}
      </main>
      
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#1f2937',
            color: '#fff',
            border: '1px solid #374151'
          }
        }}
      />
    </div>
  );
}

export default App;
