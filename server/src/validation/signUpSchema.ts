import z from "zod";
const RoleEnum = z.enum(["USER", "SUPERADMIN"]);
export const signUpSchema = z.object({
  name: z
    .string()
    .min(10, "The string must have at least 10 characters")
    .max(80, "The string must have at most 80 characters"),
  email: z.email(),
  password: z
    .string()
    .min(7, "password must hav at least 7 charecters")
    .max(15, "password must have at most 15 charecters"),
  role: RoleEnum.default("USER"),
});
