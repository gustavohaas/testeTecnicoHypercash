import { z } from 'zod'

export const createUserSchema = z.object({
  name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  email: z.email("E-mail inválido"),
  cnpj: z.string().min(14, "CNPJ deve ter no mínimo 14 caracteres"),
  monthlyRevenue: z.string().min(1, "Faturamento médio mensal é obrigatório"),
  whatsappAdmin: z.string().min(10, "WhatsApp do administrador é obrigatório"),
  whatsappSuport: z.string().min(10, "WhatsApp do suporte é obrigatório"),
  password: z.string().min(8, "Senha deve ter no mínimo 8 caracteres"),
  confirmPassword: z.string().min(8, "Confirmar senha deve ter no mínimo 8 caracteres")
})

export type CreateUserInput = z.infer<typeof createUserSchema>
