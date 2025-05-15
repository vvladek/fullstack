import { UsersControllers } from "./users.controllers.js"



export class Controllers {
  users() {
    return new UsersControllers()
  }
}