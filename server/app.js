import express from "express"
import cors from "cors"
import path from 'path';
import { fileURLToPath } from 'url';
import { TodosRouter } from "./routes/todos.router.js"
import { initMongoConnection } from "./mongo/mongo.js"
import { expressServerPort } from "./config/constants.js"


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


class App {
  constructor() {
    this.app = express()
    this.todosRouter = new TodosRouter(this.app)
  }

  async start() {
    await initMongoConnection()
    this.app.use(cors())
    this.app.use(express.json())
    this.app.use(express.static(path.join(__dirname, '../client')));
    this.todosRouter.setRoutes()
    this.app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/index.html'));
    });
    this.app.listen(expressServerPort, () => console.log(`🚀 Server running on port ${expressServerPort}`))
  }
}



new App().start()