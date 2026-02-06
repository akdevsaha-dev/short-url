import { InitScheduler } from "../bootstrap.js";
import { config } from "../config/config.js";
import { createServer } from "../index.js";
import { connectRedis } from "../lib/redis.js";


const app = createServer()
await InitScheduler()
await connectRedis()

app.listen(config.port, (() => {
    console.log(`server is running on port ${config.port}`)
}))