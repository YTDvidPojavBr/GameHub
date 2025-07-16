import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { GamepadIcon, Settings, BarChart3, Plus } from 'lucide-react';

const Header = ({ onNavigate, currentPage, totalGames, totalDownloads }) => {
  return (
    <header className="bg-black/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div 
            onClick={() => onNavigate('home')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg group-hover:shadow-lg group-hover:shadow-purple-500/25 transition-all duration-200">
              <GamepadIcon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                GameHub
              </h1>
              <p className="text-gray-500 text-sm">Downloads de Jogos PC</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-4">
              <Badge variant="outline" className="border-purple-500 text-purple-400">
                {totalGames} Jogos
              </Badge>
              <Badge variant="outline" className="border-green-500 text-green-400">
                {totalDownloads.toLocaleString()} Downloads
              </Badge>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                onClick={() => onNavigate('admin')}
                variant={currentPage === 'admin' ? 'default' : 'outline'}
                className={currentPage === 'admin' ? 
                  'bg-gradient-to-r from-purple-600 to-pink-600 text-white' : 
                  'border-gray-600 text-gray-300 hover:bg-gray-800'
                }
              >
                <Plus className="w-4 h-4 mr-2" />
                Adicionar
              </Button>
              
              <Button
                onClick={() => onNavigate('stats')}
                variant={currentPage === 'stats' ? 'default' : 'outline'}
                className={currentPage === 'stats' ? 
                  'bg-gradient-to-r from-purple-600 to-pink-600 text-white' : 
                  'border-gray-600 text-gray-300 hover:bg-gray-800'
                }
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Estatísticas
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;