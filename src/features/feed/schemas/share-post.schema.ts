import { z } from "zod";

export const sharePostSchema = z.object({
  body: z.string().optional(),
});

export type SharePostFormValues = z.infer<typeof sharePostSchema>;
