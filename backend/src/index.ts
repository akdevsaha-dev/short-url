import express, { type Application } from "express"
import authRoute from "./routes/auth.route.js"
import publicRoute from "./routes/public.route.js"
import cors from "cors"
import urlRoute from "./routes/url.route.js"
import cookieParser from "cookie-parser"
export const createServer = (): Application => {
    const app = express()
    app.use(cors({
        origin: "http://localhost:5173",
        credentials: true
    }))
    app.use(express.json())
    app.use(cookieParser())
    app.use("/", publicRoute)
    app.use("/api/v1/auth", authRoute)
    app.use("/api/v1/url", urlRoute)
    return app;
}