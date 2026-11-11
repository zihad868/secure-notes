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

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email({ message: "Invalid email address" }).toLowerCase(),
    password: z.string().min(1, { message: "Password is required" }),
  }),
});

export const refreshTokenSchema = z.object({
  body: z.object({
    refreshToken: z.string().min(1, { message: "Refresh token is required" }),
  }),
});

export type RegisterInput = z.infer<typeof registerSchema>["body"];
export type LoginInput = z.infer<typeof loginSchema>["body"];
