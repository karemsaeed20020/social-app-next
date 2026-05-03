import z from "zod";

export const postSchema = z.object({
  body: z.string().min(2),
  privacy: z.enum(["public", "following", "only_me"]),
  image: z.instanceof(File).optional().nullable(),
});

export type PostFormValues = z.infer<typeof postSchema>;
