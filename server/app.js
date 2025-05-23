import express from "express"
import cors from "cors"
import { TodosRouter } from "./routes/todos.router.js"
import { initMongoConnection } from "./mongo/mongo.js"
import { expressServerPort } from "./config/constants.js"



class App {
  constructor() {
    this.app = express()
    this.todosRouter = new TodosRouter(this.app)
  }

  async start() {
    await initMongoConnection()
    this.app.use(cors())
    this.app.use(express.json())
    this.todosRouter.setRoutes()
    this.app.listen(expressServerPort, () => console.log(`🚀 Server running on port ${expressServerPort}`))
  }
}



new App().start()