import { getTodosCollection } from "../mongo/mongo.js"
import { ObjectId } from "mongodb"



export class TodosController {

  async getTodos(req, res, next) {
    const result = await getTodosCollection().find().toArray()
    if (result) res.status(200).send(result)
    else res.status(404).send("sgfjsfh")
  }

  async addTodo(req, res, next) {
    const newTodo = {
      text: req.query.text,
      isCompleted: false
    }
    try {
      await getTodosCollection().insertOne(newTodo)
      res.status(200).send("Added")
    } catch (error) {
      res.status(404).send(error)
    }
  }

  async editTodo(req, res, next) {
    try {
      await getTodosCollection().updateOne({ _id: ObjectId.createFromHexString(req.query.id) }, { $set: { text: req.query.text } })
      res.status(200).send("Edited")
    } catch (error) {
      res.status(404).send(error)
    }
  }

  async deleteTodo(req, res, next) {
    try {
      await getTodosCollection().deleteOne({ _id: ObjectId.createFromHexString(req.query.id) })
      res.status(200).send("Deleted")
    } catch (error) {
      res.status(404).send(error)
    }
  }
}