import { ObjectId } from "mongodb"



export type User = {
  _id?: ObjectId
  username: string
  email: string
  passwordHash: string
}



export type UserInput = {
  username: string
  email: string
  password: string
}