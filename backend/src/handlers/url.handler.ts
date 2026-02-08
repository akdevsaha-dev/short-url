import type { Request, Response } from "express"
import { urlSchema } from "../validators/zod.js"
import { createUrl } from "../service/createUrl.js"
import { prisma } from "../lib/prisma.js"
import { redis } from "../lib/redis.js"

export const createShortUrl = async (req: Request, res: Response) => {
    try {
        const { url } = urlSchema.parse(req.body)
        if (!url) {
            return;
        }
        const userId = req.user?.id ?? null
        const getUrl = await createUrl({ url, userId })
        await redis.del(`urls:${userId}`)
        return res.status(201).json({
            success: true,
            url: getUrl.shortUrl
        })
    } catch (error: unknown) {
        return res.status(500).json({
            success: false,
            error: "Failed to create short URL",
        });
    }
}


export const getUrls = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id
        if (!userId) {
            return res.status(401).json({
                success: false,
                error: "Can't load url"
            })
        }
        const cachedKey = `urls:${userId}`
        const cached = await redis.get(cachedKey)
        if (cached) {
            return res.status(200).json({
                success: true,
                url: JSON.parse(cached)
            })
        }
        const url = await prisma.url.findMany({
            where: {
                userId
            }
        })
await redis.set(cachedKey, JSON.stringify(url), { EX: 60 })
        return res.status(200).json({
            success: true,
            url
        })
    } catch (error: unknown) {
        return res.status(500).json({
            success: false,
            error: "Internal server error",
        });
    }
}