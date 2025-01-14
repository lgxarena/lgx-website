import Link from 'next/link'
import { RiGamepadLine } from 'react-icons/ri'

import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-5">
      <RiGamepadLine className="size-10 sm:size-12" />
      <h1 className="mt-2 text-2xl font-bold sm:text-3xl">Game Over!</h1>
      <p className="mb-6 mt-4 text-center text-sm text-neutral-300 sm:max-w-md sm:text-base">
        Essa área está fora de alcance, parece que você foi para um mapa secreto… e ele não existe!
      </p>

      <Button variant="secondary" asChild>
        <Link href="/" title="Voltar para a Página Principal">
          Voltar para a página inicial
        </Link>
      </Button>
    </section>
  )
}
