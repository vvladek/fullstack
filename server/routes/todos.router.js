import { TodosController } from "../controllers/todos.controller.js"



export class TodosRouter {
  constructor(app) {
    this.app = app
    this.todosController = new TodosController()
  }

  setRoutes() {
    this.app.get('/', this.todosController.getTodos)
  }
}