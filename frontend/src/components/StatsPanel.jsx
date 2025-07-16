import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { BarChart3, Download, TrendingUp, Calendar } from 'lucide-react';

const StatsPanel = ({ games, stats }) => {
  const recentGames = games.slice(0, 5);
  const topGames = [...games].sort((a, b) => b.clicks - a.clicks).slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Overall Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-purple-900 to-purple-800 border-purple-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-100">Total de Jogos</CardTitle>
            <BarChart3 className="h-4 w-4 text-purple-200" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.totalGames}</div>
            <p className="text-xs text-purple-200">Jogos cadastrados</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-900 to-green-800 border-green-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-100">Total Downloads</CardTitle>
            <Download className="h-4 w-4 text-green-200" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.totalDownloads.toLocaleString()}</div>
            <p className="text-xs text-green-200">Cliques totais</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-900 to-blue-800 border-blue-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-100">Mais Baixado</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-200" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-white truncate">{stats.topGame.title}</div>
            <p className="text-xs text-blue-200">{stats.topGame.clicks.toLocaleString()} downloads</p>
          </CardContent>
        </Card>
      </div>

      {/* Top Games */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Jogos Mais Baixados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topGames.map((game, index) => (
              <div key={game.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg border border-gray-700">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full">
                    <span className="text-white font-bold">#{index + 1}</span>
                  </div>
                  <img 
                    src={game.image} 
                    alt={game.title}
                    className="w-16 h-12 object-cover rounded"
                  />
                  <div>
                    <h3 className="text-white font-semibold">{game.title}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline" className="border-purple-500 text-purple-400">
                        {game.category}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-bold">{game.clicks.toLocaleString()}</div>
                  <div className="text-gray-400 text-sm">downloads</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Atividade Recente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {stats.recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-white">{activity.game}</span>
                </div>
                <div className="text-right">
                  <div className="text-green-400 font-medium">+{activity.clicks}</div>
                  <div className="text-gray-400 text-xs">
                    {new Date(activity.timestamp).toLocaleString('pt-BR')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Games */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Jogos Recentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentGames.map((game) => (
              <div key={game.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg border border-gray-700">
                <div className="flex items-center space-x-4">
                  <img 
                    src={game.image} 
                    alt={game.title}
                    className="w-16 h-12 object-cover rounded"
                  />
                  <div>
                    <h3 className="text-white font-semibold">{game.title}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline" className="border-purple-500 text-purple-400">
                        {game.category}
                      </Badge>
                      <span className="text-gray-400 text-sm">
                        {new Date(game.dateAdded).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-bold">{game.clicks.toLocaleString()}</div>
                  <div className="text-gray-400 text-sm">downloads</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsPanel;