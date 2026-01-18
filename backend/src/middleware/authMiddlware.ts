import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import { config } from "../config/config.js";

export const optionalMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.token
    if (!token) {
        return next()
    }
    try {
        const payload = jwt.verify(token, config.jwtSecret as string) as {
            id: string,
            email: string
        }
        req.user = {
            id: payload.id,
            email: payload.email
        }
    } catch (error) {
        if (config.nodeEnv !== "production") {
            console.warn("Optional auth failed:", error);
        }
    }
    next()
}