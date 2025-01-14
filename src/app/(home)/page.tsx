import Link from 'next/link'
import { RiScrollToBottomLine } from 'react-icons/ri'

import { Button } from '@/components/ui/button'
import { generateWhatsAppLink } from '@/utils/generate-whatsapp-link'

import { DesktopPricing } from './_components/desktop-pricing'
import { MobilePricing } from './_components/mobile-pricing'

export default function Home() {
  const bookText = generateWhatsAppLink(
    'Olá, gostaria de fazer uma reserva para [inserir data e horário].'
  )

  const checkOpeningText = generateWhatsAppLink(
    'Olá! Gostaria de saber se vocês estarão abertos no [inserir motivo, como **Corujão** ou **feriado**] do dia [inserir data].'
  )

  return (
    <div>
      <section
        className="relative z-[5] flex h-[calc(100dvh-72px)] w-full flex-col items-center justify-center gap-10
          bg-hero-mobile bg-cover bg-center bg-no-repeat px-5 sm:bg-hero-desktop"
      >
        <h1
          className="max-w-xl text-center text-4xl font-bold [text-shadow:0_0_2px_#ffffff] sm:text-[56px]
            sm:leading-tight"
        >
          ONDE OS GAMERS SE TORNAM LENDAS
        </h1>
        <Button className="w-full max-w-96" asChild>
          <a href={bookText} rel="noreferrer" target="_blank">
            Faça sua reserva
          </a>
        </Button>

        <RiScrollToBottomLine className="absolute bottom-6 size-6 text-neutral-300 md:bottom-12 md:size-8" />
      </section>

      <section className="relative z-[5] flex flex-col items-center bg-neutral px-5 py-8 sm:py-10">
        <strong className="text-3xl sm:text-[32px]">Sobre nós</strong>
        <p className="mb-5 mt-4 max-w-screen-md text-center">
          A LGX Arena é um dos principais centros de jogos de São Paulo e do Brasil. Iniciamos nossa
          trajetória em 2006, no ABC Paulista, com a abertura da nossa primeira loja em Diadema. Em
          2010, expandimos para São Paulo, onde atualmente temos nosso maior centro.
        </p>
        <Button className="w-full sm:max-w-60" variant="secondary" asChild>
          <Link href="/sobre">Saiba mais</Link>
        </Button>
      </section>

      <section className="relative z-[5] mx-auto flex flex-col items-center bg-neutral px-5 py-8 sm:py-10">
        <strong className="text-center text-3xl sm:text-[32px]">Horário de funcionamento</strong>
        <ul className="my-4 flex w-full max-w-screen-xl flex-col gap-2 sm:justify-center sm:gap-3 md:flex-row">
          <li className="flex w-full flex-col items-center gap-2 rounded-md bg-neutral-900 py-5 sm:py-6">
            <p className="text-sm font-medium sm:text-base">Segunda - Quinta</p>
            <b className="font-semibold sm:text-xl">11:00 - 22:00</b>
          </li>
          <li className="flex w-full flex-col items-center gap-2 rounded-md bg-neutral-900 py-5 sm:py-6">
            <p className="text-sm font-medium sm:text-base">Sexta e Sábado</p>
            <b className="font-semibold sm:text-xl">11:00 - 21:30</b>
          </li>
          <li className="flex w-full flex-col items-center gap-2 rounded-md bg-neutral-900 py-5 sm:py-6">
            <p className="text-sm font-medium sm:text-base">Domingo e feriado</p>
            <b className="font-semibold sm:text-xl">14:00 - 20:00</b>
          </li>
          <li className="flex w-full flex-col items-center gap-2 rounded-md bg-neutral-900 py-5 sm:py-6">
            <p className="text-sm font-medium sm:text-base">Corujão</p>
            <b className="font-semibold sm:text-xl">22:00 - 06:00</b>
          </li>
        </ul>
        <p className="max-w-3xl text-center text-xs leading-[1.4] text-neutral-300 sm:text-sm">
          Observação: O funcionamento durante o Corujão e feriados pode variar. Confirme se
          estaremos abertos,&nbsp;
          <a
            className="text-neutral-50 underline underline-offset-2"
            href={checkOpeningText}
            rel="noreferrer"
            target="_blank"
          >
            entre em contato
          </a>
          &nbsp;conosco ou consulte nossas redes sociais.
        </p>
      </section>

      <section className="relative z-[5] mx-auto flex flex-col items-center bg-neutral px-5 py-8 sm:py-10">
        <strong className="text-3xl sm:text-[32px]">Preços</strong>

        <MobilePricing />
        <DesktopPricing />

        <p className="max-w-3xl text-center text-xs leading-[1.4] text-neutral-300 sm:text-sm">
          Observação: O tempo adquirido fica salvo em sua conta, mas é separado por sala (comum ou
          VIP). Os pacotes Corujinha e Corujão não acumulam tempo e só são válidos durante o período
          específico do pacote.
        </p>
      </section>
    </div>
  )
}
