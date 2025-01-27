import { Router } from "express";
import productsViewRouter from "./products.views.js";
import cartViewRouter from "./carts.views.js";
import usersViewRouter from "./users.views.js";


const viewRouter = Router()


viewRouter.use("/products", productsViewRouter);
viewRouter.use("/cart", cartViewRouter);
viewRouter.use("/users", usersViewRouter);
viewRouter.get("/", productsViewRouter);


export default viewRouter