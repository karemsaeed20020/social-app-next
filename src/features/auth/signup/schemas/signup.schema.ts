import { z } from "zod";

export const signupSchema = z
  .object({
    name: z.string().min(2),
    email: z.email(),
    password: z.string().min(6),
    rePassword: z.string(),
    dateOfBirth: z.string(),
    gender: z.enum(["male", "female"]),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords don't match",
    path: ["rePassword"],
  });

export type SignupSchema = z.infer<typeof signupSchema>;
