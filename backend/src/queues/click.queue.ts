import { Queue } from "bullmq";

export const clickQueue = new Queue("click-analytics", {
    connection: {
        host: "redis",
        port: 6379
    }
})

