'use client'

import Fuse from 'fuse.js'
import {
  AlertTriangleIcon,
  FilterIcon,
  FlameIcon,
  GamepadIcon,
  InfoIcon,
  SearchIcon,
  XIcon,
} from 'lucide-react'
import { parseAsString, useQueryState } from 'nuqs'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Combobox } from '@/components/ui/combobox'
import { categories, categoryTranslation } from '@/data/categories'
import { games } from '@/data/games'

import { GameCard } from './components/game-card'

export default function Games() {
  const [query, setQuery] = useQueryState(
    'q',
    parseAsString.withDefault('').withOptions({
      shallow: false,
      throttleMs: 600,
    })
  )
  const [selectedCategory, setSelectedCategory] = useQueryState(
    'category',
    parseAsString.withDefault('allCategories')
  )

  const clearFilters = () => {
    setQuery(null)
    setSelectedCategory(null)
  }

  const fuse = new Fuse(games, {
    includeScore: true,
    threshold: 0.35,
    keys: ['name'],
  })

  const filterGames = () => {
    let filtered = games

    if (query) {
      const results = fuse.search(query)
      filtered = results.map((result) => result.item)
    }

    if (selectedCategory && selectedCategory !== 'allCategories') {
      filtered = filtered.filter((game) =>
        game.categories.includes(
          Object.keys(categoryTranslation).find(
            (key) => categoryTranslation[key] === selectedCategory
          ) ?? ''
        )
      )
    }

    return filtered
  }

  const filteredGames = filterGames()

  return (
    <div className="mx-auto w-full max-w-screen-xl">
      <div className="inline-flex w-full flex-col gap-2 md:flex-row">
        <div className="relative w-full md:max-w-sm">
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-neutral-300" />
          <input
            placeholder="Buscar jogos..."
            value={query}
            className={`peer h-11 w-full rounded-md bg-neutral-900 pl-10 pr-12 text-sm placeholder:text-neutral-300
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-50
              disabled:cursor-not-allowed`}
            onChange={(e) => setQuery(e.target.value)}
          />

          <Button
            key="clear-search"
            aria-label="Limpar pesquisa"
            size="icon"
            variant="ghost"
            className="absolute right-1 top-1/2 size-10 -translate-y-1/2 text-neutral-300 peer-placeholder-shown:hidden
              hover:text-neutral-50 focus-visible:text-neutral-50"
            onClick={() => setQuery('')}
          >
            <XIcon className="size-5" />
          </Button>
        </div>

        <Combobox
          defaultValue="Todas as categorias"
          placeholder="Filtrar categorias..."
          value={selectedCategory}
          options={categories.map((category) => ({
            value: categoryTranslation[category],
            label: category,
          }))}
          onSelect={setSelectedCategory}
        />
      </div>

      {!query && selectedCategory === 'allCategories' && (
        <section className="mt-8">
          <h2 className="mb-6 flex items-center text-2xl font-bold">
            <FlameIcon className="mr-2 text-primary" /> Jogos Populares
          </h2>
          <div className="overflow-x-auto scrollbar-none">
            <ul className="flex gap-4">
              {games
                .filter((game) => game.isPopular)
                .map((game) => (
                  <GameCard
                    key={game.name}
                    className="h-[250px] min-[608px]:h-[300px] min-[928px]:h-[368px] min-[1248px]:h-[392.785px]"
                    game={game}
                  />
                ))}
            </ul>
          </div>
        </section>
      )}
      <section className="mt-8">
        <h2 className="mb-6 flex items-center text-2xl font-bold">
          {(query || selectedCategory !== 'allCategories') && (
            <>
              <FilterIcon className="mr-2 text-primary" /> Resultados
            </>
          )}
          {!query && selectedCategory === 'allCategories' && (
            <>
              <GamepadIcon className="mr-2 text-primary" /> Todos os Jogos
            </>
          )}
        </h2>
        {filteredGames.length > 0 && (
          <ul
            className="grid grid-cols-2 gap-x-4 gap-y-8 min-[608px]:grid-cols-3 min-[928px]:grid-cols-4
              min-[1248px]:grid-cols-5"
          >
            {filteredGames.map((game) => (
              <GameCard key={game.name} game={game} />
            ))}
          </ul>
        )}
        {filteredGames.length <= 0 && (
          <>
            <div className="flex flex-col items-center rounded-lg p-4">
              <AlertTriangleIcon className="size-12 text-primary" />
              <h5 className="mb-6 mt-4 text-center text-neutral-300">
                Nenhum jogo encontrado com os filtros atuais.
              </h5>
              <Button size="sm" onClick={clearFilters}>
                Limpar filtros
              </Button>
            </div>

            <Alert className="mx-auto mt-8 max-w-lg">
              <InfoIcon className="size-5" />
              <AlertTitle>Não encontrou o jogo que procura?</AlertTitle>
              <AlertDescription>
                Entre em contato conosco para verificar a disponibilidade. Se o jogo não estiver em
                nossa lista, podemos baixá-lo e instalá-lo para você jogar em sua próxima visita.
              </AlertDescription>
            </Alert>
          </>
        )}
      </section>
    </div>
  )
}
