import { Router } from "express";
import { signIn, signOut, signUp, status } from "../handlers/auth.handler.js";
import { rateLimiter } from "../middleware/rateLimit.js";
import { optionalMiddleware } from "../middleware/authMiddlware.js";
const router = Router()

router.post("/signup", rateLimiter, signUp)
router.post("/signin", rateLimiter, signIn)
router.post("/signout", signOut)
router.get("/status", optionalMiddleware, status)
export default router