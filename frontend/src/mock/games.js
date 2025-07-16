export const mockGames = [
  {
    id: '1',
    title: 'Cyberpunk 2077',
    description: 'Um RPG de ação e aventura em mundo aberto que se passa em Night City, uma metrópole obcecada por poder, glamour e modificações corporais.',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop',
    downloadLink: 'https://example.com/cyberpunk2077',
    category: 'RPG',
    clicks: 1547,
    dateAdded: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    title: 'The Witcher 3: Wild Hunt',
    description: 'Um RPG de fantasia épico em mundo aberto, onde você joga como Geralt de Rivia, um caçador de monstros em busca de sua filha adotiva.',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop',
    downloadLink: 'https://example.com/witcher3',
    category: 'RPG',
    clicks: 2341,
    dateAdded: '2024-01-20T14:15:00Z'
  },
  {
    id: '3',
    title: 'Grand Theft Auto V',
    description: 'Jogo de ação e aventura em mundo aberto que se passa em Los Santos, uma cidade fictícia baseada em Los Angeles.',
    image: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&h=600&fit=crop',
    downloadLink: 'https://example.com/gtav',
    category: 'Ação',
    clicks: 3892,
    dateAdded: '2024-01-25T09:45:00Z'
  },
  {
    id: '4',
    title: 'Counter-Strike 2',
    description: 'O mais novo capítulo do CS atualizado para Source 2, com melhorias gráficas e mecânicas refinadas.',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop',
    downloadLink: 'https://example.com/cs2',
    category: 'FPS',
    clicks: 5673,
    dateAdded: '2024-02-01T16:20:00Z'
  },
  {
    id: '5',
    title: 'Red Dead Redemption 2',
    description: 'Épico western em mundo aberto sobre foras da lei e a luta pela sobrevivência no coração da América.',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=600&fit=crop',
    downloadLink: 'https://example.com/rdr2',
    category: 'Aventura',
    clicks: 2156,
    dateAdded: '2024-02-05T11:10:00Z'
  },
  {
    id: '6',
    title: 'Elden Ring',
    description: 'Um RPG de ação e fantasia sombria criado pela FromSoftware e George R.R. Martin.',
    image: 'https://images.unsplash.com/photo-1538481199464-7160b8f4df9b?w=800&h=600&fit=crop',
    downloadLink: 'https://example.com/eldenring',
    category: 'RPG',
    clicks: 4321,
    dateAdded: '2024-02-10T13:30:00Z'
  }
];

export const mockCategories = [
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

export const mockStats = {
  totalGames: 6,
  totalDownloads: 20030,
  topGame: {
    title: 'Counter-Strike 2',
    clicks: 5673
  },
  recentActivity: [
    { game: 'Counter-Strike 2', clicks: 45, timestamp: '2024-02-15T14:30:00Z' },
    { game: 'Elden Ring', clicks: 23, timestamp: '2024-02-15T13:45:00Z' },
    { game: 'GTA V', clicks: 67, timestamp: '2024-02-15T12:15:00Z' }
  ]
};