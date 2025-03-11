'use server'

import { render } from '@react-email/components'

import { EmailTemplate } from '@/emails/contact-email'
import { transporter } from '@/lib/transporter'
import { ContactFormData } from '@/schemas/contact-schema'

type State = {
  status: 'error' | 'success'
  message: string
}

export async function sendContactEmail({ name, email, message }: ContactFormData): Promise<State> {
  try {
    const emailHTML = await render(EmailTemplate({ name, email, message }))

    const options = {
      from: `${name} <${process.env.SMTP_USER}>`,
      replyTo: `${name} <${email}>`,
      to: process.env.SMTP_USER,
      subject: `Novo Contato de ${name}`,
      html: emailHTML,
      text: `Nome: ${name}\nEmail: ${email}\nMensagem:\n${message}`,
    }

    await transporter.sendMail(options)

    return { status: 'success', message: 'E-mail enviado com sucesso.' }
  } catch {
    return { status: 'error', message: 'Falha ao enviar email.' }
  }
}
