import z from "zod";

export const loginSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(7, "password must hav at least 7 charecters")
    .max(15, "password must have at most 15 charecters"),
});
