import { Router } from "express"
import usersRouter from "./users.api.js"
import productsRouter from "./products.api.js"
import cartsRouter from "./carts.api.js";
import emailRouter from "./email.api.js"

const apiRouter = Router()

apiRouter.use("/users", usersRouter)
apiRouter.use("/products", productsRouter)
apiRouter.use("/carts", cartsRouter);
apiRouter.use("/sessions", usersRouter)
apiRouter.use("/email", emailRouter)

export default apiRouter