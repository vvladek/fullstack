import { getUsersCollection } from "../mongo/mongo.js"
import bcrypt from "bcrypt"
import { ObjectId } from "mongodb"



export class UsersController {

  async getUsers(req, res, next) {
    try {
      const result = await getUsersCollection().find().toArray()
      res.status(200).send(result)
    } catch (error) {
      res.status(404).send(error)
    }
  }

  async addUser(req, res, next) {
    const saltRounds = 10
    const hash = await bcrypt.hash(req.query.password, saltRounds)
    if (!hash) return res.status(500).send("Server error")
    const newUser = {
      username: req.query.username,
      email: req.query.email,
      passwordHash: hash
    }
    try {
      await getUsersCollection().insertOne(newUser)
      res.status(200).send("Added")
    } catch (error) {
      res.status(404).send(error)
    }
  }

}