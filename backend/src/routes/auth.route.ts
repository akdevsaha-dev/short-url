import { Router } from "express";
import { signIn, signOut, signUp } from "../handlers/auth.handler.js";
import { rateLimiter } from "../middleware/rateLimit.js";
const router = Router()

router.post("/signup", rateLimiter, signUp)
router.post("/signin",rateLimiter, signIn)
router.post("/signout", signOut)
export default router