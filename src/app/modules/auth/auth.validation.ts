import { z } from "zod";

export const registerSchema = z.object({
  body: z.object({
    name: z.string().trim().optional(),
    email: z.string().email({ message: "Invalid email address" }).toLowerCase(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    interests: z.array(z.string()).optional(),
  }),
});

export type RegisterInput = z.infer<typeof registerSchema>["body"];

