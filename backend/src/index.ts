import express, { type Application } from "express"
import authRoute from "./routes/auth.route.js"
import urlRoute from "./routes/url.route.js"
export const createServer = (): Application => {
    const app = express()
    app.use(express.json())
    app.use("/api/v1/auth", authRoute)
    app.use("/api/v1/url", urlRoute)
    return app;
}