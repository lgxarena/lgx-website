import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().trim().min(1, 'Nome é obrigatório'),
  email: z.string().trim().min(1, 'E-mail é obrigatório').email('E-mail inválido'),
  message: z.string().trim().min(1, 'Mensagem é obrigatória'),
})

export type ContactFormData = z.infer<typeof contactSchema>
