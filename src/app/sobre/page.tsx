import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sobre - LGX Arena',
  description:
    'Desde 2006 no ABC e desde 2010 em São Paulo: conheça a história da LGX Arena, centro de games e e-sports com mais de 40 computadores.',
  alternates: {
    canonical: 'https://lgxarena.com.br/sobre',
  },
}

export default function About() {
  return (
    <main className="relative z-[5] flex flex-1 flex-col bg-neutral px-5 py-8 md:py-10">
      <h1 className="mb-4 text-center text-3xl font-bold sm:text-[32px]">Nossa história</h1>
      <p className="mx-auto max-w-screen-xl text-left font-normal">
        A LGX Arena é um dos principais centros de jogos de São Paulo e do Brasil. Iniciamos nossa
        trajetória em 2006, no ABC Paulista, com a abertura da nossa primeira loja em Diadema. Em
        2010, expandimos para São Paulo, onde atualmente temos nosso maior centro.
      </p>
      <p className="mx-auto mt-4 max-w-screen-xl text-left font-normal">
        Somos um centro de jogos e esportes eletrônicos que oferece mais de 40 computadores, onde os
        clientes podem desfrutar dos jogos mais populares do mercado. Oferecemos um ambiente
        tranquilo, confortável e acolhedor, proporcionando uma experiência agradável para pessoas de
        todas as idades, seja para se divertir com amigos ou competir.
      </p>
      <p className="mx-auto mt-4 max-w-screen-xl text-left font-normal">
        Nos últimos anos, temos concentrado nosso foco no e-sport, acompanhando o crescimento do
        esporte eletrônico. Nosso objetivo é oferecer um centro de treinamento profissional para
        equipes amadoras e profissionais. Também organizamos torneios de nível regional e nacional,
        como a Liga SP de CS2, além de promover nossos próprios eventos.
      </p>
    </main>
  )
}
