import bcrypt from "bcryptjs"
import { prisma } from "../lib/prisma.js"

export const createUser = async ({ email, password }: { email: string, password: string }) => {
    email = email.toLowerCase().trim();
    const existingUser = await prisma.user.findUnique({
        where: {
            email
        }
    })
    if (existingUser) {
        throw new Error("Email already exists")
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword
        },
        select: {
            id: true,
            email: true
        }
    })
    return user;
}