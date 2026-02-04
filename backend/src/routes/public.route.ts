import { Router } from "express";
import { redirectToSite } from "../handlers/public.handler.js";

const router = Router()

router.get("/:shortUrl", redirectToSite)

export default router;