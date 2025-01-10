import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div>
      <section
        className="flex h-[calc(100dvh-72px)] w-full flex-col items-center justify-center gap-10 bg-hero-mobile
          bg-cover bg-center bg-no-repeat px-5"
      >
        <h1 className="text-center text-4xl font-bold [text-shadow:0_0_2px_#ffffff]">
          ONDE OS <span className="block sm:inline">GAMERS</span>&nbsp;
          <span>SE TORNAM LENDAS</span>
        </h1>
        <Button className="w-full">Faça sua reserva</Button>
      </section>
    </div>
  )
}
