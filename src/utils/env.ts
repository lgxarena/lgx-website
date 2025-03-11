import { z } from 'zod'

const envSchema = z.object({
  PORT: z.coerce.number().min(1000),
  ENV: z
    .union([z.literal('development'), z.literal('testing'), z.literal('production')])
    .default('development'),
  SMTP_HOST: z.string().min(1),
  SMTP_PORT: z.coerce.number().min(100),
  SMTP_SECURE: z.union([z.literal('true'), z.literal('false')]).default('true'),
  SMTP_USER: z.string().min(1).email(),
  SMTP_PASSWORD: z.string().min(1),
  NEXT_PUBLIC_APP_URL: z.string().min(1),
})

export const env = envSchema.parse(process.env)
