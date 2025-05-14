const express = require("express")
const { MongoClient, ObjectId } = require("mongodb")
const app = express()
const port = 3000
const uri = "mongodb://localhost:27017"
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
app.use(express.json())

client.connect().then(() => {
  console.log("Connected to MongoDB")
}).catch((err) => {
  console.error("Failed to connect to MongoDB", err)
})

const db = client.db("myNewDB")
const collection = db.collection("myNewDBtestCollection")

app.get("/", async (req, res) => {
  try {
    const result = await collection.find().toArray()
    res.send(result)
  } catch (err) {
    res.send("Error")
  }
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})