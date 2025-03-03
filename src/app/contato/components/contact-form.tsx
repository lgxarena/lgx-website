'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { sendContactEmail } from '@/actions/send-contact-email'
import { Field } from '@/components/common/field'
import { Honeypot } from '@/components/common/honeypot'
import { Input } from '@/components/ui/input'
import Label from '@/components/ui/label'
import { SubmitButton } from '@/components/ui/submit-button'
import { Textarea } from '@/components/ui/textarea'
import { ContactFormData, contactSchema } from '@/schemas/contact-schema'

export function ContactForm() {
  const [honeypot, setHoneypot] = useState('')
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const handleSubmit = form.handleSubmit(async (formData) => {
    if (honeypot) return

    const response = await sendContactEmail(formData)

    if (response.status === 'success') {
      form.reset()
      toast.success(response.message, {
        duration: 5000,
      })
    } else {
      toast.error(response.message, {
        duration: 5000,
      })
    }
  })

  return (
    <form className="flex w-full flex-col space-y-5" onSubmit={handleSubmit}>
      <div className="space-y-4">
        <Field>
          <Label htmlFor="name">Nome</Label>
          <Input
            disabled={form.formState.isSubmitting}
            id="name"
            placeholder="Digite seu nome"
            type="text"
            {...form.register('name')}
          />
        </Field>
        <Field>
          <Label htmlFor="email">E-mail</Label>
          <Input
            disabled={form.formState.isSubmitting}
            id="email"
            inputMode="email"
            placeholder="Digite seu e-mail"
            type="email"
            {...form.register('email')}
          />
        </Field>
        <Field>
          <Label htmlFor="message">Mensagem</Label>
          <Textarea
            disabled={form.formState.isSubmitting}
            id="message"
            placeholder="Digite sua mensagem"
            rows={5}
            {...form.register('message')}
          />
        </Field>
        <Honeypot value={honeypot} onChange={setHoneypot} />
      </div>

      <SubmitButton className="w-full" isLoading={form.formState.isSubmitting}>
        Enviar mensagem
      </SubmitButton>
    </form>
  )
}
