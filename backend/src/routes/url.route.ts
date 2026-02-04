import { Router } from "express";
import { createShortUrl, getUrls } from "../handlers/url.handler.js";
import { optionalMiddleware } from "../middleware/authMiddlware.js";
import { rateLimiter } from "../middleware/rateLimit.js";

const router = Router()

router.post("/createShortUrl", optionalMiddleware, rateLimiter, createShortUrl)
router.get("/getUrls",optionalMiddleware, getUrls)
export default router;