import { MongoClient } from "mongodb"
import { mongoDBUri } from "../constants/constants.js"


const mongoClient = new MongoClient(mongoDBUri)
let usersCollection


async function initMongoConnection() {
  try {
    await mongoClient.connect()
    usersCollection = mongoClient.db("sample_mflix").collection("users")
    console.log("✅ Connected to MongoDB")
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB:", err)
    process.exit(1)
  }
}


function getUsersCollection() {
  if (!usersCollection) throw new Error("MongoDB not initialized")
  return usersCollection
}


export { initMongoConnection, getUsersCollection }