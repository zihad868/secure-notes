import { z } from "zod";

export const createPostSchema = z.object({
  body: z.object({
    title: z.string().trim().min(1, { message: "Title is required" }),
    content: z.string().optional().default(""),
    isPublic: z.boolean().optional().default(true),
  }),
});

export const updatePostSchema = z.object({
  body: z.object({
    title: z.string().trim().min(1, { message: "Title cannot be empty" }).optional(),
    content: z.string().optional(),
    isPublic: z.boolean().optional(),
  }),
});

export type CreatePostInput = z.infer<typeof createPostSchema>["body"];
export type UpdatePostInput = z.infer<typeof updatePostSchema>["body"];

