import { Router } from "express";
import { productController } from "../../controllers/product.controller.js";

const productsViewRouter = Router()

productsViewRouter.get("/", productController.showProducts)
 

export default productsViewRouter