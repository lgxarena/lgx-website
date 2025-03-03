import nodemailer, { SendMailOptions } from 'nodemailer'

import { env } from '@/utils/env'

export const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: Number(env.SMTP_PORT),
  secure: true,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASSWORD,
  },
})

export const sendMail = (mailOptions: SendMailOptions) => transporter.sendMail(mailOptions)
