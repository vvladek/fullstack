import { UsersController } from "../controllers/users.controller.js"



export class UsersRouter {
  constructor(app) {
    this.app = app
    this.usersController = new UsersController()
  }

  setRoutes() {
    this.app.get('/', this.usersController.getUsersDB)
  }
}