import { Metadata } from 'next'

import { Button } from '@/components/ui/button'
import { generateWhatsAppLink } from '@/utils/generate-whatsapp-link'

export const metadata: Metadata = {
  title: 'Eventos - LGX Arena',
  alternates: {
    canonical: 'https://lgxarena.com.br/eventos',
  },
}

export default function Events() {
  const requestQuoteLink = generateWhatsAppLink(
    'Olá! Gostaria de solicitar um orçamento para um evento na LGX.'
  )

  return (
    <main className="relative z-[5] flex flex-1 flex-col bg-neutral px-5 py-8 md:py-10">
      <h1 className="mb-4 text-center text-3xl font-bold sm:text-[32px]">Eventos</h1>

      <p className="mx-auto max-w-screen-xl text-justify font-normal">
        Organizamos uma variedade de eventos, como MIX, BOOTCAMPS e campeonatos, para empresas,
        organizações e instituições, além de confraternizações particulares. Também realizamos
        nossos próprios eventos, como LIGA SP CS:GO e LGX CUP, abrangendo diferentes modalidades de
        jogos. Todos os nossos eventos e campeonatos são divulgados nas nossas redes sociais.
        Oferecemos uma infraestrutura completa, com computadores de alta performance, monitores
        profissionais, cadeiras gamers, internet de 1 Gigabit, salas climatizadas e servidores
        dedicados. Solicite um orçamento conosco por telefone ou e-mail.
      </p>

      <h3 className="mx-auto mb-2 mt-8 w-full max-w-screen-xl text-center text-xl font-semibold">
        Aniversários
      </h3>
      <p className="mx-auto max-w-screen-xl text-justify font-normal">
        Comemore seu aniversário na LGX e viva uma experiência inesquecível, reunindo seus melhores
        amigos para se divertir com seus jogos preferidos. Para organizar sua festa conosco, é
        necessário agendar com antecedência, garantindo que tudo esteja bem preparado para você e
        seus convidados. Nosso pacote de aniversário já inclui um buffet completo, com valores que
        variam conforme o tempo de permanência na loja.
      </p>

      <Button className="mx-auto mt-10 w-full max-w-96" asChild>
        <a href={requestQuoteLink} rel="noreferrer" target="_blank">
          Solicitar orçamento
        </a>
      </Button>
    </main>
  )
}
