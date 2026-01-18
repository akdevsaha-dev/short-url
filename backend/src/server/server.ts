import { config } from "../config/config.js";
import { createServer } from "../index.js";


const app = createServer()

app.listen(config.port, (() => {
    console.log(`server is running on port ${config.port}`)
}))