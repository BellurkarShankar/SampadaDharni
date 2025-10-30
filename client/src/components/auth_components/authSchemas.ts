import z, { email, string } from "zod";

export const UserRolesEnum = z.enum(["USER", "SUPERADMIN"]);

export const loginPageSchema = z.object({
  email: email(),
  password: string()
    .min(7, "password must hav at least 7 charecters")
    .max(15, "password must have at most 15 charecters"),
});

export const registerPageSchema = z
  .object({
    name: z
      .string()
      .min(10, "The string must have at least 10 characters")
      .max(80, "The string must have at most 80 characters"),
    email: z.email(),
    password: z
      .string()
      .min(7, "password must hav at least 7 charecters")
      .max(15, "password must have at most 15 charecters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "Password doesn't macth, pls try again",
    path: ["confirmPassword"],
  });

export type LoginPageSchemaType = z.infer<typeof loginPageSchema>;
export type RegisterPageSchemaType = z.infer<typeof registerPageSchema>;
