import bcrypt from "bcryptjs"
import { prisma } from "../lib/prisma.js"

export const verifyUser = async ({ email, password }: { email: string, password: string }) => {
    email = email.toLowerCase().trim();
    const user = await prisma.user.findUnique({
        where: { email }
    })
    if (!user) {
        throw new Error("User doesnot exist")
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (isPasswordValid) {
        return {
            id: user.id,
            email: user.email
        }
    }
    throw new Error("Wrong password")
}