import z from "zod"

export const urlSchema = z.object({
    url: z.url()
})

export const authSchema = z.object({
    email: z.email(),
    password: z.string().min(6)
})