'use server'

import { sendMail } from '@/lib/nodmailer'
import { ContactFormData } from '@/schemas/contact-schema'
import { env } from '@/utils/env'

export async function sendContactEmail({ name, email, message }: ContactFormData) {
  try {
    const mailOptions = {
      from: `${name} <${env.SMTP_USER}>`,
      replyTo: `${name} <${email}>`,
      to: env.SMTP_USER,
      subject: `Novo Contato de ${name}`,
      text: `Nome: ${name}\nEmail: ${email}\nMensagem:\n${message}`,
    }

    await sendMail(mailOptions)

    return { success: true }
  } catch {
    return { success: false, error: 'Falha ao enviar email.' }
  }
}
