import { Field } from '@/components/common/field'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Label from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export default function Contact() {
  return (
    <main className="relative z-[5] flex flex-1 flex-col bg-neutral px-5 py-8 md:py-10">
      <div>
        <h1 className="mb-4 text-center text-3xl font-bold sm:text-[32px]">Entrar em contato</h1>
        <p className="mx-auto max-w-screen-xl text-center text-neutral-300">
          Envie uma mensagem no formulário abaixo ou entre em contato pelas redes sociais ou
          pessoalmente.
        </p>

        <form className="mt-4 space-y-5 pb-8">
          <div className="space-y-4">
            <Field>
              <Label htmlFor="name">Nome</Label>
              <Input id="name" name="name" placeholder="Digite seu nome" type="text" />
            </Field>
            <Field>
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" name="email" placeholder="Digite seu e-mail" type="email" />
            </Field>
            <Field>
              <Label htmlFor="message">Mensagem</Label>
              <Textarea id="message" name="message" placeholder="Digite sua mensagem" />
            </Field>
          </div>

          <Button className="w-full">Enviar mensagem</Button>
        </form>
      </div>
      <div>
        <b>Ligue pra gente</b>
        <a href="#tel">11 5623-4874</a>
      </div>
    </main>
  )
}
