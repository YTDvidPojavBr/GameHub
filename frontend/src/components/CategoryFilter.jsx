import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange, gameCount }) => {
  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-white">Categorias</h3>
        <Badge variant="outline" className="border-purple-500 text-purple-400">
          {gameCount} jogos
        </Badge>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            onClick={() => onCategoryChange(category)}
            variant={selectedCategory === category ? 'default' : 'outline'}
            className={
              selectedCategory === category 
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700' 
                : 'border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white'
            }
            size="sm"
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;