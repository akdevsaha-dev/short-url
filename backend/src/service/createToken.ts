import jwt from "jsonwebtoken"
import { config } from "../config/config.js"

export const createToken = ({ id, email }: { id: string, email: string }) => {
    const token = jwt.sign({ id, email }, config.jwtSecret as string)
    return token;
}