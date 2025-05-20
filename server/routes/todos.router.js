import { TodosController } from "../controllers/todos.controller.js"



export class TodosRouter {
  constructor(app) {
    this.app = app
    this.todosController = new TodosController()
  }

  setRoutes() {
    this.app.get('/todos/', this.todosController.getTodos)
    this.app.get('/todos/add/', this.todosController.addTodo)
    this.app.get('/todos/edit/', this.todosController.editTodo)
    this.app.get('/todos/delete/', this.todosController.deleteTodo)
  }
}