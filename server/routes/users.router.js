import { UsersController } from "../controllers/users.controller.js"



export class UsersRouter {
  constructor(app) {
    this.app = app
    this.todosController = new UsersController()
  }

  setRoutes() {
    this.app.get('/users/', this.todosController.getUsers)
    this.app.post('/users/add/', this.todosController.addUser)
  }
}