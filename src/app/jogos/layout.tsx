import { Metadata } from 'next'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { PropsWithChildren, Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Jogos - LGX E-Sport Arena',
  description:
    'Dos FPS eletrizantes aos MOBAs estratégicos, temos os jogos que dominam o cenário competitivo. Entre na arena, mostre suas habilidades e alcance o topo!',
}

export default function GamesLayout({ children }: PropsWithChildren) {
  return (
    <main className="relative z-[5] flex flex-1 flex-col bg-neutral px-5 py-8 md:py-10">
      <h1 className="mb-4 text-center text-3xl font-bold sm:text-[32px]">
        Jogos: Onde a habilidade define o vencedor
      </h1>
      <p className="mx-auto mb-4 max-w-screen-xl text-center text-neutral-300 md:mb-10">
        Dos FPS eletrizantes aos MOBAs estratégicos, temos os jogos que dominam o cenário
        competitivo. Entre na arena, mostre suas habilidades e alcance o topo!
      </p>

      <NuqsAdapter>
        <Suspense>{children}</Suspense>
      </NuqsAdapter>
    </main>
  )
}
