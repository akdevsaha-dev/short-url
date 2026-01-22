import { Router } from "express";
import { createShortUrl, redirectToSite } from "../handlers/url.handler.js";
import { optionalMiddleware } from "../middleware/authMiddlware.js";
import { rateLimiter } from "../middleware/rateLimit.js";

const router = Router()

router.post("/createShortUrl", optionalMiddleware, rateLimiter, createShortUrl)
router.get("/getSite/:shortUrl", redirectToSite)
export default router;