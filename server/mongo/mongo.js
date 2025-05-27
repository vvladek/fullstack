import { MongoClient } from "mongodb"
import { mongoDBUri } from "../config/constants.js"


const mongoClient = new MongoClient(mongoDBUri)
let todosCollection
let usersCollection


async function initMongoConnection() {
  try {
    await mongoClient.connect()
    todosCollection = mongoClient.db("nefarious").collection("todos")
    usersCollection =  mongoClient.db("nefarious").collection("users")
    console.log("✅ Connected to MongoDB")
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB:", err)
    process.exit(1)
  }
}


function getTodosCollection() {
  if (!todosCollection) throw new Error("❌ Failed to connect to todos collection")
  return todosCollection
}


function getUsersCollection() {
  if (!usersCollection) throw new Error("❌ Failed to connect to users collection")
  return usersCollection
}



export { initMongoConnection, getTodosCollection, getUsersCollection }