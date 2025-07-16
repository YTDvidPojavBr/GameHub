import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import GameCard from './components/GameCard';
import CategoryFilter from './components/CategoryFilter';
import AdminPanel from './components/AdminPanel';
import StatsPanel from './components/StatsPanel';
import GameDetails from './components/GameDetails';
import { mockGames, mockCategories, mockStats } from './mock/games';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [games, setGames] = useState(mockGames);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedGame, setSelectedGame] = useState(null);
  const [stats, setStats] = useState(mockStats);

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
  const handleDownload = (game) => {
    // Increment click counter
    setGames(prevGames => 
      prevGames.map(g => 
        g.id === game.id 
          ? { ...g, clicks: g.clicks + 1 }
          : g
      )
    );
    
    // Update stats
    setStats(prevStats => ({
      ...prevStats,
      totalDownloads: prevStats.totalDownloads + 1,
      recentActivity: [
        { game: game.title, clicks: 1, timestamp: new Date().toISOString() },
        ...prevStats.recentActivity.slice(0, 2)
      ]
    }));
    
    // Open download link
    window.open(game.downloadLink, '_blank');
    
    // Show success toast
    toast.success(`Download iniciado: ${game.title}`, {
      description: 'O link foi aberto em uma nova aba'
    });
  };

  // Handle game details view
  const handleViewDetails = (game) => {
    setSelectedGame(game);
    setCurrentPage('details');
  };

  // Handle add new game
  const handleAddGame = (gameData) => {
    const newGame = {
      id: Date.now().toString(),
      ...gameData,
      clicks: 0,
      dateAdded: new Date().toISOString()
    };
    
    setGames(prevGames => [newGame, ...prevGames]);
    setStats(prevStats => ({
      ...prevStats,
      totalGames: prevStats.totalGames + 1
    }));
    
    toast.success('Jogo adicionado com sucesso!', {
      description: `${gameData.title} foi adicionado à biblioteca`
    });
  };

  // Handle update game
  const handleUpdateGame = (gameId, updatedData) => {
    setGames(prevGames =>
      prevGames.map(game =>
        game.id === gameId 
          ? { ...game, ...updatedData }
          : game
      )
    );
    
    toast.success('Jogo atualizado com sucesso!', {
      description: 'As alterações foram salvas'
    });
  };

  // Handle delete game
  const handleDeleteGame = (gameId) => {
    setGames(prevGames => prevGames.filter(game => game.id !== gameId));
    setStats(prevStats => ({
      ...prevStats,
      totalGames: prevStats.totalGames - 1
    }));
    
    toast.success('Jogo removido com sucesso!', {
      description: 'O jogo foi removido da biblioteca'
    });
  };

  // Calculate total downloads
  const totalDownloads = games.reduce((sum, game) => sum + game.clicks, 0);

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
              categories={mockCategories}
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
                <h3 className="text-gray-400 text-xl">Nenhum jogo encontrado nesta categoria</h3>
                <p className="text-gray-500 mt-2">Tente selecionar outra categoria</p>
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
              stats={{
                ...stats,
                totalGames: games.length,
                totalDownloads: totalDownloads,
                topGame: games.reduce((max, game) => game.clicks > max.clicks ? game : max, games[0])
              }}
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