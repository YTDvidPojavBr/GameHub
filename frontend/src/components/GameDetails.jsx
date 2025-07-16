import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Download, Eye, ArrowLeft, Calendar } from 'lucide-react';

const GameDetails = ({ game, onBack, onDownload }) => {
  if (!game) return null;

  return (
    <div className="space-y-6">
      <Button
        onClick={onBack}
        variant="outline"
        className="border-gray-600 text-gray-300 hover:bg-gray-800"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Voltar
      </Button>

      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src={game.image} 
                alt={game.title}
                className="w-24 h-18 object-cover rounded-lg"
              />
              <div>
                <CardTitle className="text-white text-2xl mb-2">{game.title}</CardTitle>
                <div className="flex items-center space-x-3">
                  <Badge className="bg-purple-600 hover:bg-purple-700 text-white">
                    {game.category}
                  </Badge>
                  <div className="flex items-center text-gray-400 text-sm">
                    <Eye className="w-4 h-4 mr-1" />
                    {game.clicks.toLocaleString()} downloads
                  </div>
                  <div className="flex items-center text-gray-400 text-sm">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(game.dateAdded).toLocaleDateString('pt-BR')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-white text-lg font-semibold mb-3">Descrição</h3>
              <p className="text-gray-300 leading-relaxed">{game.description}</p>
            </div>

            <div className="border-t border-gray-700 pt-6">
              <div className="flex items-center justify-center">
                <Button
                  onClick={() => onDownload(game)}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium px-8 py-3 text-lg transform hover:scale-105 transition-all duration-200"
                  size="lg"
                >
                  <Download className="w-5 h-5 mr-3" />
                  Download do Jogo
                </Button>
              </div>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <h4 className="text-white font-semibold mb-2">Informações do Download</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Total de Downloads:</span>
                  <span className="text-white">{game.clicks.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Data de Adição:</span>
                  <span className="text-white">{new Date(game.dateAdded).toLocaleDateString('pt-BR')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Categoria:</span>
                  <span className="text-white">{game.category}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GameDetails;