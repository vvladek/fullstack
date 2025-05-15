import { Controllers } from "../controllers/controllers.js"
import { Router } from "express"


export class UsersRoutes extends Controllers {
  constructor() {
    super()
    this.router = Router()
  }
  getUsersRoutes() {
    return [
      this.router.get('/', this.users().getDB),
    ]
  }
}