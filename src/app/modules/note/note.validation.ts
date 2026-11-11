import { z } from "zod";

export const createNoteSchema = z.object({
  body: z.object({
    title: z.string().trim().min(1, { message: "Title is required" }),
    content: z.string().optional().default(""),
    isCompleted: z.boolean().optional().default(false),
  }),
});

export const updateNoteSchema = z.object({
  body: z.object({
    title: z.string().trim().min(1, { message: "Title cannot be empty" }).optional(),
    content: z.string().optional(),
    isCompleted: z.boolean().optional(),
  }),
});

export type CreateNoteInput = z.infer<typeof createNoteSchema>["body"];
export type UpdateNoteInput = z.infer<typeof updateNoteSchema>["body"];

