import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().trim().min(1, 'Nome obrigatório'),
  email: z.string().email('E-mail inválido').trim().min(1, 'E-mail obrigatório'),
  message: z.string().trim().min(1, 'Mensagem obrigatório').min(10, 'Mensagem muito curta'),
})

export type ContactFormData = z.infer<typeof contactSchema>
