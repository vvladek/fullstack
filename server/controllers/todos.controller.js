import { getTodosCollection } from "../mongo/mongo.js"



export class TodosController {
  
  async getTodos(req, res, next) {
    const result = await getTodosCollection().find().toArray()
    if (result) res.status(200).send(result)
    else res.status(404).send("sgfjsfh")
  }
}