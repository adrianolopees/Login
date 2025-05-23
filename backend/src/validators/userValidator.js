import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string()
    .min(3, "Username deve ter no mínimo 3 caracteres")
    .max(30, "Username deve ter no máximo 30 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
  name: z.string().optional(),
});

export const loginSchema = z.object({
  identifier: z.string().nonempty("Identifier é obrigatório"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});
