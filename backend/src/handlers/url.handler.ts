import type { Request, Response } from "express"
import { urlSchema } from "../validators/zod.js"
import { createUrl } from "../service/createUrl.js"
import { getLongUrl } from "../service/getLongUrl.js"

export const createShortUrl = async (req: Request, res: Response) => {
    try {
        const { url } = urlSchema.parse(req.body)
        if (!url) {
            return;
        }
        const userId = req.user?.id ?? null
        const getUrl = await createUrl({ url, userId })
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

export const redirectToSite = async (req: Request, res: Response) => {
    try {
        const { shortUrl } = req.params;
        if (!shortUrl || typeof shortUrl !== "string") {
            return res.status(400).json({ error: "Invalid short code" });
        }
        if (!shortUrl) {
            return res.status(400).json({
                success: false,
                error: "Invalid"
            })
        }
        const longUrl = await getLongUrl(shortUrl)
        return res.redirect(302, longUrl)
    } catch (error: unknown) {
        if (error instanceof Error && error.message === "Short URL not found") {
            return res.status(404).json({
                success: false,
                error: "URL not found",
            });
        }
        return res.status(500).json({
            success: false,
            error: "Internal server error",
        });
    }
}