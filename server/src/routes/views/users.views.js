import { Router } from "express";
import { userController } from "../../controllers/user.controller.js";


const usersViewRouter = Router()

usersViewRouter.post("/register", userController.register)
usersViewRouter.post("/login", userController.login)


usersViewRouter.get("/login", (req, res) => {
    res.render('login')
});

usersViewRouter.get("/register", (req, res) => {
    res.render('register')
});

export default usersViewRouter  