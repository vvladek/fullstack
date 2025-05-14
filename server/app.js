const express = require("express")
const app = express()
const port = 3000

const MongoClient = require("mongodb").MongoClient

MongoClient.connect("mongodb://localhost:27017/", (err, client) => {
  if (err) throw err

  const db = client.db("myNewDB")

  db.collection("myNewDBtestCollection").find().toArray((err, result) => {
    if (err) throw err

    app.get("/", (req, res) => {
      res.send(result)
    })

    console.log(result)
  })
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})