import { z } from "zod"

export const createUserSchema = z.object({
  name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  email: z.string().email("E-mail inválido"),
  cnpj: z.string().min(14, "CNPJ deve ter no mínimo 14 caracteres"),
  monthlyRevenue: z.string().min(1, "Faturamento médio mensal é obrigatório"),
  whatsappAdmin: z.string().min(10, "WhatsApp do administrador é obrigatório"),
  whatsappSuport: z.string().min(10, "WhatsApp do suporte é obrigatório"),
  password: z
    .string()
    .min(8, "A senha deve ter no mínimo 8 caracteres")
    .regex(/[A-Z]/, "Deve conter pelo menos uma letra maiúscula")
    .regex(/[a-z]/, "Deve conter pelo menos uma letra minúscula")
    .regex(/[0-9]/, "Deve conter pelo menos um número")
    .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, "Deve conter pelo menos um caractere especial"),
  confirmPassword: z.string(),
  projectType: z.enum(["InfoProduto", "Dropshipping", "E-commerce"]),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
})

export type CreateUserInput = z.infer<typeof createUserSchema>