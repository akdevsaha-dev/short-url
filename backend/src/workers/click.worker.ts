import { Worker } from "bullmq";
import { redis } from "../lib/redis.js";
import { prisma } from "../lib/prisma.js";


new Worker("click-analytics", async job => {

    if (job.name === "track-click") {
        const { shortUrl } = job.data
        await redis.incr(`clicks:${shortUrl}`)
        await redis.expire(`clicks:${shortUrl}`, 3600)
    }
    if (job.name === "flush-clicks") {
        const keys = await redis.keys("clicks:*")
        for (const key of keys) {
            const shortUrl = key.replace("clicks:", "")
            const clicks = Number(await redis.get(key))
            if (clicks > 0) {
                await prisma.url.update({
                    where: { shortUrl },
                    data: {
                        clicks: {
                            increment: clicks
                        }
                    },
                });
            }
            await redis.del(key)
        }
    }
},
    {
        connection: {
            host: "redis",
            port: 6379,
        }
    })