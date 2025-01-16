import { Router } from "express"
import { passportCall } from "../../passport/passportCall.js";
import { roleAuth } from '../../middlewares/roleAuth.js'
import { userController } from "../../controllers/user.controller.js";



const usersApiRouter = Router()


usersApiRouter.post("/register", userController.register);
usersApiRouter.post("/login", userController.login);
usersApiRouter.get("/current", [passportCall('current'), roleAuth('admin', 'user')], userController.privateData);


export default usersApiRouter   