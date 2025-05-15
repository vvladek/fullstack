import { getUsersCollection } from "../mongo/mongo.js"



export class UsersControllers {
  
  async getDB(req, res, next) {
    const result = await getUsersCollection().find().toArray()
    if (result) res.status(200).send(result)
    else res.status(404).send("sgfjsfh")
  }
}