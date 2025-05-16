import { MongoClient } from "mongodb"
import { mongoDBUri } from "../config/constants.js"


const mongoClient = new MongoClient(mongoDBUri)
let todosCollection


async function initMongoConnection() {
  try {
    await mongoClient.connect()
    todosCollection = mongoClient.db("nefarious").collection("todos")
    console.log("✅ Connected to MongoDB")
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB:", err)
    process.exit(1)
  }
}


function getTodosCollection() {
  if (!todosCollection) throw new Error("MongoDB not initialized")
  return todosCollection
}


export { initMongoConnection, getTodosCollection }