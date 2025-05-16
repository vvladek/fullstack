import express from "express"
import { UsersRouter } from "./routes/users.router.js"
import { initMongoConnection } from "./mongo/mongo.js"
import { expressServerPort } from "./constants/constants.js"



class App {
  constructor() {
    this.app = express()
    this.usersRouter = new UsersRouter(this.app)
  }

  async init() {
    await initMongoConnection()
    this.app.use(express.json())
    this.usersRouter.setRoutes()
    this.app.listen(expressServerPort, () => console.log(`🚀 Server running on port ${expressServerPort}`))
  }
}



new App().init()