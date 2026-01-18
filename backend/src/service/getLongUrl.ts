import { prisma } from "../lib/prisma.js"

export const getLongUrl = async (shortUrl: string) => {

    const url = await prisma.url.findUnique({
        where: {
            shortUrl
        }
    })
    if (!url) {
        throw new Error("not found");
    }

    return url?.originalUrl
}