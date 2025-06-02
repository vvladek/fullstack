import { ObjectId } from "mongodb"



export type User = {
  _id?: ObjectId
  username: string
  email: string
  passwordHash: string
}



export type UserRegistrationInputData = {
  username: string
  email: string
  password: string
  confirmedPassword: string
}