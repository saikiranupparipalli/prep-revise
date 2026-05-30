import {z} from "zod"

export const signUpModel = z.object({
    firstName:z.string().max(14).nullable(),
    lastName: z.string().optional(),
    email:z.email(),
    password:z.string()
})