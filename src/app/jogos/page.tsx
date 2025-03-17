'use client'

import { FilterIcon, FlameIcon, GamepadIcon, MicIcon, SearchIcon, XIcon } from 'lucide-react'
import Image from 'next/image'
import { parseAsString, useQueryState } from 'nuqs'

import { Button } from '@/components/ui/button'
import { Combobox } from '@/components/ui/responsive-combobox'
import { categories, categoryTranslation } from '@/data/categories'
import { games } from '@/data/games'
import { useIsMobile } from '@/hooks/use-is-mobile'

export default function Games() {
  const [query, setQuery] = useQueryState(
    'q',
    parseAsString.withDefault('').withOptions({
      shallow: false,
      throttleMs: 1000,
    })
  )
  const [selectedCategory, setSelectedCategory] = useQueryState(
    'category',
    parseAsString.withDefault('')
  )
  const isMobile = useIsMobile()

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
          {isMobile && (
            <Button
              key="search-by-voice"
              aria-label="Pesquisar por voz"
              className="absolute right-1 top-1/2 size-10 -translate-y-1/2 text-neutral-300 peer-not-placeholder:hidden"
              size="icon"
              variant="ghost"
            >
              <MicIcon className="size-5" />
            </Button>
          )}

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

      {!query && !selectedCategory && (
        <section className="mt-8">
          <h2 className="mb-6 flex items-center text-2xl font-bold">
            <FlameIcon className="mr-2 text-primary" /> Jogos Populares
          </h2>
          <div className="-mx-1 overflow-x-auto px-1 pb-4 scrollbar-none">
            <ul className="flex gap-4 whitespace-nowrap">
              {games
                .filter((game) => game.isPopular)
                .map((game) => (
                  <li key={game.name}>
                    <div className="relative h-[300px] w-[200px]">
                      <Image alt={game.name} className="object-cover" src={game.image} fill />
                    </div>
                    <p>{game.name}</p>
                    {/* <p>{game.categories.join(', ')}</p> */}
                  </li>
                ))
                .sort()}
            </ul>
          </div>
        </section>
      )}
      <section className="mt-8">
        <h2 className="mb-6 flex items-center text-2xl font-bold">
          {query || selectedCategory ? (
            <>
              <FilterIcon className="mr-2 text-primary" /> Resultados
            </>
          ) : (
            <>
              <GamepadIcon className="mr-2 text-primary" /> Todos os Jogos
            </>
          )}
        </h2>
        <ul className="flex flex-wrap gap-4">
          {games.map((game) => (
            <li key={game.name}>
              <div className="relative h-[300px] w-[200px]">
                <Image alt={game.name} className="object-cover" src={game.image} fill />
              </div>
              <p>{game.name}</p>
              {/* <p>{game.categories.join(', ')}</p> */}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
