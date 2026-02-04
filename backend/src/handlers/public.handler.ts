import type { Request, Response } from "express";
import { redis } from "../lib/redis.js";
import { getLongUrl } from "../service/getLongUrl.js";

export const redirectToSite = async (req: Request, res: Response) => {
    try {
        const { shortUrl } = req.params;
        if (!shortUrl || typeof shortUrl !== "string") {
            return res.status(400).json({ error: "Invalid short code" });
        }
        const cached = await redis.get(`url:${shortUrl}`)
        if (cached) {
            await redis.incr(`clicks:${shortUrl}`)
            await redis.expire(`clicks:${shortUrl}`, 3600)
            return res.redirect(302, cached)
        }
        const longUrl = await getLongUrl(shortUrl)
        if (!longUrl) {
            return res.status(404).json({ error: "Short URL not found" });
        }
        await redis.set(`url:${shortUrl}`, longUrl, { EX: 3600 })
        await redis.incr(`clicks:${shortUrl}`)
        await redis.expire(`clicks:${shortUrl}`, 3600)
        return res.redirect(302, longUrl)
    } catch (error: unknown) {
        return res.status(500).json({
            success: false,
            error: "Internal server error",
        });
    }
}