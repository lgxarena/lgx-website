import Image from 'next/image'

import { Game } from '@/data/games'

type GameCardProps = {
  game: Game
  className?: string
}

export function GameCard({ className, game }: GameCardProps) {
  return (
    <li className={className}>
      <div className="relative aspect-[2/3] h-[calc(100%-28px)] min-h-[200px]">
        <Image alt={game.name} className="object-cover" src={game.image} fill />
      </div>
      <p className="mt-1 truncate">{game.name}</p>
    </li>
  )
}
