import { z } from "zod";

export const createUserSchema = z.object({
  body: z.object({
    name: z.string().trim().optional(),
    email: z.string().email().toLowerCase(),
    password: z.string().min(8),
    role: z.enum(["user", "admin"]).optional(),
    interests: z.array(z.string().trim().min(1)).optional(),
  }),
});

export const updateUserSchema = z.object({
  body: z.object({
    name: z.string().trim().optional(),
    email: z.string().email().toLowerCase().optional(),
    password: z.string().min(8).optional(),
    role: z.enum(["user", "admin"]).optional(),
    interests: z.array(z.string().trim().min(1)).optional(),
  }).refine((body) => Object.keys(body).length > 0, {
    message: "At least one field is required",
  }),
});

export type CreateUserInput = z.infer<typeof createUserSchema>["body"];
export type UpdateUserInput = z.infer<typeof updateUserSchema>["body"];
