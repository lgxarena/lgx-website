'use server'

import { transporter } from '@/lib/transporter'
import { ContactFormData } from '@/schemas/contact-schema'
import { env } from '@/utils/env'

type State = {
  status: 'error' | 'success'
  message: string
}

export async function sendContactEmail({ name, email, message }: ContactFormData): Promise<State> {
  try {
    const mailOptions = {
      from: `${name} <${env.SMTP_USER}>`,
      replyTo: `${name} <${email}>`,
      to: env.SMTP_USER,
      subject: `Novo Contato de ${name}`,
      text: `Nome: ${name}\nEmail: ${email}\nMensagem:\n${message}`,
    }

    await transporter.sendMail(mailOptions)

    return { status: 'success', message: 'E-mail enviado com sucesso.' }
  } catch {
    return { status: 'error', message: 'Falha ao enviar email.' }
  }
}
