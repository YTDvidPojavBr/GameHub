import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Download, Eye } from 'lucide-react';

const GameCard = ({ game, onDownload, onViewDetails }) => {
  return (
    <Card className="bg-gray-900 border-gray-800 hover:border-purple-500 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 group">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <img 
            src={game.image} 
            alt={game.title}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <Badge className="absolute top-2 right-2 bg-purple-600 hover:bg-purple-700 text-white">
            {game.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-white text-lg mb-2 line-clamp-2 group-hover:text-purple-400 transition-colors">
          {game.title}
        </CardTitle>
        <p className="text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed">
          {game.description}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-gray-500 text-sm">
            <Eye className="w-4 h-4 mr-1" />
            {game.clicks.toLocaleString()} downloads
          </div>
          <div className="text-gray-500 text-xs">
            {new Date(game.dateAdded).toLocaleDateString('pt-BR')}
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button
            onClick={() => onDownload(game)}
            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium transition-all duration-200 transform hover:scale-105"
          >
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
          <Button
            onClick={() => onViewDetails(game)}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-200"
          >
            Detalhes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default GameCard;