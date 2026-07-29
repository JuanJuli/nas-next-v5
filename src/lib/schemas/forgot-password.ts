import { z } from "zod"

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Please input your email!")
    .email("Please enter a valid email!"),
})

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>
