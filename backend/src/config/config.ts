import 'dotenv/config'
export const config = {
    port: process.env.PORT,
    jwtSecret: process.env.JWT_SECRET,
    nodeEnv: process.env.NODE_ENV
}