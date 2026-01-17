import { Router } from "express";
import { signUp } from "../handlers/auth.handler.js";
const router = Router()

router.post("/signup", signUp)

export default router