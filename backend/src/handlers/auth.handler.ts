import type { Request, Response } from "express";
import { authSchema } from "../validators/zod.js";
import { createUser } from "../service/createUser.js";
import { createToken } from "../service/createToken.js";
import { config } from "../config/config.js";
import { ZodError } from "zod";
import { Prisma } from "../generated/prisma/client.js";
import { verifyUser } from "../service/verifyUser.js";

export const signUp = async (req: Request, res: Response) => {
    try {
        const { email, password } = authSchema.parse(req.body)
        const user = await createUser({ email, password })
        if (!user) {
            return res.status(400).json({ success: false, error: "cannot create user" })
        }
        const jwt = createToken({ id: user.id, email: user.email })
        res.cookie("token", jwt, {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            secure: config.nodeEnv === "production",
            sameSite: "strict",
            httpOnly: true
        })
        return res.status(201).json({ success: true, message: "User created successfully" })
    } catch (error: unknown) {
        if (error instanceof ZodError) {
            return res.status(400).json({
                success: false,
                error: "Validation failed",
                details: error.issues
            })
        }
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
            return res.status(409).json({
                success: false,
                error: "Email already exists",
            });
        }

        if (error instanceof Error) {
            return res.status(400).json({
                success: false,
                error: error.message,
            });
        }
        console.error("Unknown error:", error);
        return res.status(500).json({
            success: false,
            error: "Internal server error",
        });
    }
}

export const signIn = async (req: Request, res: Response) => {
    try {
        const { email, password } = authSchema.parse(req.body)
        const user = await verifyUser({ email, password })
        if (!user) {
            return res.status(400).json({ success: false, error: "cannot create user" })
        }
        const jwt = createToken({ id: user.id, email: user.email })
        res.cookie("token", jwt, {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            secure: config.nodeEnv === "production",
            sameSite: "strict",
            httpOnly: true
        })
        return res.status(201).json({ success: true, message: "Logged in successfully" })
    } catch (error: unknown) {
        if (error instanceof ZodError) {
            return res.status(400).json({
                success: false,
                error: "Validation failed",
                details: error.issues
            })
        }
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
            return res.status(409).json({
                success: false,
                error: "Email already exists",
            });
        }

        if (error instanceof Error) {
            return res.status(400).json({
                success: false,
                error: error.message,
            });
        }
        console.error("Unknown error:", error);
        return res.status(500).json({
            success: false,
            error: "Internal server error",
        });
    }
}

export const signOut = (req: Request, res: Response) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: config.nodeEnv === "production",
        sameSite: "strict"
    })
    res.status(200).json({ success: true, message: "Signed out successfully" })
}