import { z } from "zod"

export const createUserSchema = z.object({
  name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  email: z.string().email("E-mail inválido"),

})

export type CreateUserInput = z.infer<typeof createUserSchema>
