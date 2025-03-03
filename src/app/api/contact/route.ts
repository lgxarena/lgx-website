import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

import { env } from '@/utils/env'

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json()

    const transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: Number(env.SMTP_PORT),
      secure: env.SMTP_SECURE === 'true',
      auth: {
        type: 'login',
        user: env.SMTP_USER,
        pass: env.SMTP_PASSWORD,
      },
    })

    const mailOptions = {
      from: {
        name,
        address: env.SMTP_USER,
      },
      replyTo: {
        name,
        address: email,
      },
      to: env.SMTP_USER,
      subject: `Novo Contato de ${name}`,
      text: `Nome: ${name}\nEmail: ${email}\nMensagem:\n${message}`,
      sender: {
        name,
        address: email,
      },
    }

    await transporter.sendMail(mailOptions)
    return NextResponse.json({ success: true }, { status: 200 })
  } catch {
    return NextResponse.json({ error: 'Falha ao enviar email.' }, { status: 500 })
  }
}
