import express from "express"
import { Routes } from "./routes/routes.js"
import { initMongoConnection } from "./mongo/mongo.js"
import { expressServerPort } from "./constants/constants.js"



class App extends Routes {
  constructor() {
    super()
    this.app = express()
  }

  async init() {
    await initMongoConnection()
    this.app.use(express.json())
    this.app.use(this.getRoutes())
    this.app.listen(expressServerPort, () => console.log(`🚀 Server running on port ${expressServerPort}`))
  }
}



new App().init()