import { prisma } from "../lib/prisma.js"
import { generateShortCode } from "./generateShortCode.js"

export const createUrl = async ({ url, userId }: { url: string, userId: string | null }) => {
    const existing = await prisma.url.findFirst({
        where: {
            originalUrl: url,
            userId
        }
    })
    if (existing) {
        return {
            shortUrl: existing.shortUrl,
        }
    }
    const shortCode = generateShortCode(url)
    const newUrl = await prisma.url.create({
        data: {
            originalUrl: url,
            shortUrl: shortCode,
            userId
        }
    })
    return {
        shortUrl: newUrl.shortUrl,
    }
}