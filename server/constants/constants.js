import dotenv from "dotenv"
dotenv.config()


export const expressServerPort = process.env.EXPRESS_SERVER_PORT
export const mongoDBUri = process.env.MONGODB_URI