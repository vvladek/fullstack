import { User } from "@/types/user"
import { Collection, MongoClient } from "mongodb"



if (!process.env.MONGODB_URI) throw new Error("Invalid / Missing environment variable: MONGODB_URI")

const MONGODB_URI = process.env.MONGODB_URI



const mongoClientPromise: Promise<MongoClient> = new MongoClient(MONGODB_URI).connect()



export async function getUsersCollection(): Promise<Collection<User>> {
  const mongoClient: MongoClient = await mongoClientPromise
  return mongoClient.db("nefarious").collection("users")
}