import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';

const categories = [
  'RPG',
  'Ação',
  'FPS',
  'Aventura',
  'Estratégia',
  'Esporte',
  'Corrida',
  'Simulação'
];

const AdminPanel = ({ games, onAddGame, onUpdateGame, onDeleteGame }) => {
  const [isEditing, setIsEditing] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    downloadLink: '',
    category: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      onUpdateGame(isEditing, formData);
    } else {
      onAddGame(formData);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      image: '',
      downloadLink: '',
      category: ''
    });
    setIsEditing(null);
  };

  const handleEdit = (game) => {
    setFormData({
      title: game.title,
      description: game.description,
      image: game.image,
      downloadLink: game.downloadLink,
      category: game.category
    });
    setIsEditing(game.id);
  };

  return (
    <div className="space-y-6">
      {/* Add/Edit Game Form */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            {isEditing ? <Edit className="w-5 h-5 mr-2" /> : <Plus className="w-5 h-5 mr-2" />}
            {isEditing ? 'Editar Jogo' : 'Adicionar Novo Jogo'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title" className="text-white">Título</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                  required
                />
              </div>
              <div>
                <Label htmlFor="category" className="text-white">Categoria</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    {categories.map((category) => (
                      <SelectItem key={category} value={category} className="text-white">
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label htmlFor="description" className="text-white">Descrição</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                rows={3}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="image" className="text-white">Link da Imagem</Label>
              <Input
                id="image"
                type="url"
                value={formData.image}
                onChange={(e) => handleInputChange('image', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="https://exemplo.com/imagem.jpg"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="downloadLink" className="text-white">Link de Download</Label>
              <Input
                id="downloadLink"
                type="url"
                value={formData.downloadLink}
                onChange={(e) => handleInputChange('downloadLink', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="https://exemplo.com/download"
                required
              />
            </div>
            
            <div className="flex gap-2">
              <Button
                type="submit"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                <Save className="w-4 h-4 mr-2" />
                {isEditing ? 'Salvar Alterações' : 'Adicionar Jogo'}
              </Button>
              {isEditing && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetForm}
                  className="border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancelar
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Games List */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Jogos Cadastrados ({games.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {games.map((game) => (
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
                        {game.clicks.toLocaleString()} downloads
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    onClick={() => handleEdit(game)}
                    variant="outline"
                    size="sm"
                    className="border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => onDeleteGame(game.id)}
                    variant="outline"
                    size="sm"
                    className="border-red-600 text-red-400 hover:bg-red-900/20"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPanel;