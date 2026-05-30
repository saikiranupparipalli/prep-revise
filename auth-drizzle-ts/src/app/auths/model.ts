import { z } from "zod";

export const signUpModel = z.object({
  firstName: z.string().max(14),
  lastName: z.string().optional(),
  email: z.email(),
  password: z.string(),
});

export const signInModel = z.object({
    email: z.email(),
    password:z.string()
})