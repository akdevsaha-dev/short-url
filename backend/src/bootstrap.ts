import { clickQueue } from "./queues/click.queue.js"


export const InitScheduler = async () => {
    await clickQueue.upsertJobScheduler(
        "flush-clicks-scheduler",
        {
            every: 60_000
        },
        {
            name: "flush-clicks",
            data: {}
        }
    )
    console.log("Flush clicks scheduler registered");
}
