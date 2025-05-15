import { UsersRoutes } from "./users.routes.js"



export class Routes {
  getRoutes() {
    return [ new UsersRoutes().getUsersRoutes() ]
  }
}