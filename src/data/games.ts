type Game = {
  name: string
  image: string
  categories: string[]
  isPopular: boolean
}

export const games = [
  {
    name: 'Counter-Strike 2',
    categories: ['FPS', 'Tiro', 'Competitivo'],
    image: '/images/games/counter-strike-2.png',
    isPopular: true,
  },
  {
    name: 'League of Legends',
    categories: ['MOBA', 'Estratégia', 'Competitivo'],
    image: '/images/games/league-of-legends.jpg',
    isPopular: true,
  },
  {
    name: 'Fortnite',
    categories: ['Battle Royale', 'Tiro', 'Construção'],
    image: '/images/games/fortnite.jpg',
    isPopular: true,
  },
  {
    name: 'Valorant',
    categories: ['FPS', 'Tiro', 'Competitivo'],
    image: '/images/games/valorant.jpg',
    isPopular: true,
  },
  {
    name: 'Dota 2',
    categories: ['MOBA', 'Estratégia', 'Competitivo'],
    image: '/images/games/dota-2.png',
    isPopular: true,
  },
  {
    name: 'Minecraft',
    categories: ['Sandbox', 'Aventura', 'Construção'],
    image: '/images/games/minecraft.jpg',
    isPopular: false,
  },
  {
    name: 'Call of Duty: Warzone',
    categories: ['Battle Royale', 'FPS', 'Tiro'],
    image: '/images/games/call-of-duty-warzone.png',
    isPopular: false,
  },
  {
    name: 'Apex Legends',
    categories: ['Battle Royale', 'FPS', 'Tiro'],
    image: '/images/games/apex-legends.jpg',
    isPopular: false,
  },
  {
    name: 'World of Warcraft',
    categories: ['MMORPG', 'RPG', 'Aventura', 'Fantasia'],
    image: '/images/games/world-of-warcraft.jpg',
    isPopular: false,
  },
  {
    name: 'Overwatch 2',
    categories: ['FPS', 'Tiro', 'Competitivo'],
    image: '/images/games/overwatch-2.png',
    isPopular: false,
  },
  {
    name: 'Rocket League',
    categories: ['Esportes', 'Corrida', 'Competitivo'],
    image: '/images/games/rocket-league.jpg',
    isPopular: false,
  },
  {
    name: 'FIFA 24',
    categories: ['Esportes', 'Simulação', 'Competitivo'],
    image: '/images/games/fc-24.jpg',
    isPopular: false,
  },
  {
    name: 'Crossfire',
    categories: ['FPS', 'Tiro'],
    image: '/images/games/crossfire.jpg',
    isPopular: false,
  },
  {
    name: 'DayZ',
    categories: ['Sobrevivência', 'Tiro', 'Aventura'],
    image: '/images/games/dayz.jpg',
    isPopular: false,
  },
  {
    name: 'Destiny 2',
    categories: ['FPS', 'MMO', 'Aventura', 'RPG', 'Sci-Fi'],
    image: '/images/games/destiny-2.jpg',
    isPopular: false,
  },
  {
    name: 'Combat Arms',
    categories: ['FPS', 'Tiro'],
    image: '/images/games/combat-arms.jpg',
    isPopular: false,
  },
  {
    name: 'Genshin Impact',
    categories: ['RPG de Ação', 'Aventura', 'Fantasia'],
    image: '/images/games/genshin-impact.jpg',
    isPopular: false,
  },
  {
    name: 'Grand Theft Auto V',
    categories: ['Ação', 'Aventura', 'Mundo Aberto'],
    image: '/images/games/grand-theft-auto-v.jpg',
    isPopular: false,
  },
  {
    name: 'Heroes of the Storm',
    categories: ['MOBA', 'Estratégia', 'Competitivo'],
    image: '/images/games/heroes-of-the-storm.jpg',
    isPopular: false,
  },
  {
    name: 'Left 4 Dead 2',
    categories: ['FPS', 'Tiro', 'Sobrevivência'],
    image: '/images/games/left-4-dead-2.jpg',
    isPopular: false,
  },
  {
    name: 'Left 4 Dead',
    categories: ['FPS', 'Tiro', 'Sobrevivência'],
    image: '/images/games/left-4-dead.jpg',
    isPopular: false,
  },
  {
    name: 'Path of Exile',
    categories: ['RPG de Ação'],
    image: '/images/games/path-of-exile.jpg',
    isPopular: false,
  },
  {
    name: 'Point Blank',
    categories: ['FPS', 'Tiro'],
    image: '/images/games/point-blank.jpg',
    isPopular: false,
  },
  {
    name: 'Rainbow Six Siege',
    categories: ['FPS', 'Competitivo'],
    image: '/images/games/rainbow-six-siege.jpg',
    isPopular: false,
  },
  {
    name: 'Roblox',
    categories: ['Sandbox', 'Aventura', 'MMO'],
    image: '/images/games/roblox.jpg',
    isPopular: false,
  },
  {
    name: 'Team Fortress 2',
    categories: ['FPS', 'Tiro'],
    image: '/images/games/team-fortress-2.jpg',
    isPopular: false,
  },
  {
    name: 'The Sims 4',
    categories: ['Simulação'],
    image: '/images/games/the-sims-4.jpg',
    isPopular: false,
  },
].sort((a, b) => a.name.localeCompare(b.name)) satisfies Game[]
