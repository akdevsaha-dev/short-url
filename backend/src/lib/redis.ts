import { createClient } from "redis";

export const redis = createClient({
    url: "redis://redis:6379"
})

redis.on("error", (err) => console.error("redis error", err))

export const connectRedis = async () => {
    if (!redis.open) {
        await redis.connect()
    }
}
