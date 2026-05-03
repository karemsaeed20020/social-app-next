import z from "zod";

export const replySchema = z.object({
  content: z.string().min(2),
  image: z.any().optional(),
});

export type ReplyFormValues = z.infer<typeof replySchema>;
