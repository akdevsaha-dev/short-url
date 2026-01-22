import type { Request, Response, NextFunction } from "express";
import { redis } from "../lib/redis.js";

const CAPACITY = 10;
const REFILL_RATE = 1;
const EXPIRE_SECONDS = 60;

export const rateLimiter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const identifier = req.user?.id ?? req.ip;
    const key = `bucket:${identifier}`;

    const now = Date.now();

    const data = await redis.hGetAll(key);

    let tokens = data.tokens ? parseFloat(data.tokens) : CAPACITY;
    let lastRefill = data.lastRefill ? parseInt(data.lastRefill) : now;

    const elapsedSeconds = (now - lastRefill) / 1000;
    const refill = elapsedSeconds * REFILL_RATE;

    tokens = Math.min(CAPACITY, tokens + refill);

    if (tokens < 1) {
      return res.status(429).json({
        success: false,
        message: "Rate limit exceeded. Try again later.",
      });
    }
    tokens -= 1;

    await redis.hSet(key, {
      tokens: tokens.toString(),
      lastRefill: now.toString(),
    });

    await redis.expire(key, EXPIRE_SECONDS);

    next();
  } catch (error) {
    console.error("Token bucket error:", error);
    next();
  }
};