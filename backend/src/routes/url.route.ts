import { Router } from "express";
import { createShortUrl, redirectToSite } from "../handlers/url.handler.js";
import { optionalMiddleware } from "../middleware/authMiddlware.js";

const router = Router()

router.post("/createShortUrl", optionalMiddleware, createShortUrl)
router.get("/getSite/:shortUrl", redirectToSite)
export default router;