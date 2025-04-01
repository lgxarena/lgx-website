import { Metadata } from 'next'

import { ContactForm } from './components/contact-form'

export const metadata: Metadata = {
  title: 'Contato - LGX Arena',
}

export default function Contact() {
  return (
    <main className="relative z-[5] flex flex-1 flex-col bg-neutral px-5 py-8 md:py-10">
      <h1 className="mb-4 text-center text-3xl font-bold sm:text-[32px]">Entrar em contato</h1>
      <p className="mx-auto mb-4 max-w-screen-xl text-center text-neutral-300 md:mb-10">
        Envie uma mensagem no formulário abaixo ou entre em contato pelas redes sociais ou
        pessoalmente.
      </p>

      <div className="mx-auto flex w-full max-w-screen-xl flex-col gap-x-12 gap-y-16 md:flex-row">
        <ContactForm />

        <div className="flex w-full flex-col items-center md:justify-center">
          <div className="flex flex-col items-center">
            <b className="mb-3 text-lg font-medium">Ligue pra gente</b>
            <a
              className="underline underline-offset-2"
              href="tel:+551156234874"
              rel="noopener"
              target="_blank"
            >
              11 5623-4874
            </a>
          </div>
          <div className="mt-6 flex flex-col items-center">
            <b className="mb-3 text-lg font-medium">Converse com a gente</b>
            <a
              className="underline underline-offset-2"
              href="https://wa.me/551156234874"
              rel="noopener"
              target="_blank"
            >
              Enviar mensagem no WhatsApp
            </a>
            <a
              className="mt-4 underline underline-offset-2"
              href="https://instagram.com/lgxlan"
              rel="noopener"
              target="_blank"
            >
              Enviar mensagem no Instagram
            </a>
          </div>
          <div className="mt-6 flex flex-col items-center">
            <b className="mb-3 text-lg font-medium">Venha nos visitar</b>
            <a
              className="max-w-80 text-center leading-relaxed underline underline-offset-2"
              href="https://maps.app.goo.gl/LJ4SzpHvXiL5AQ2ZA"
              rel="noopener"
              target="_blank"
            >
              Avenida Cupecê, 6062 - Bloco 1, Loja 16, Jardim Prudência, São Paulo - SP
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
