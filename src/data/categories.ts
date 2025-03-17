import { games } from './games'

export const categoryTranslation: Record<string, string> = {
  'Todas as categorias': '',
  FPS: 'fps',
  Tiro: 'shooter',
  Estratégia: 'strategy',
  Competitivo: 'competitive',
  Sandbox: 'sandbox',
  Aventura: 'adventure',
  Construção: 'construction',
  'Battle Royale': 'battle royale',
  MOBA: 'moba',
  RPG: 'rpg',
  Esportes: 'sports',
  Simulação: 'simulation',
  MMORPG: 'mmorpg',
  Corrida: 'racing',
  Sobrevivência: 'survival',
  'RPG de Ação': 'action rpg',
  Ação: 'action',
  'Sci-Fi': 'sci-fi',
  'Mundo Aberto': 'open world',
  Fantasia: 'fantasy',
  MMO: 'mmo',
}

export const categories = [
  'Todas as categorias',
  ...Array.from(new Set(games.flatMap((game) => game.categories))).sort(),
]
