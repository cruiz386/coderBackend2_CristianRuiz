import { Router } from "express"
import { productController } from "../../controllers/product.controller.js";


const productsApiRouter = Router();


productsApiRouter.get("/", productController.getAllProducts)
productsApiRouter.get("/:id", productController.getProductById)
productsApiRouter.delete("/:id", productController.deleteProductById)
productsApiRouter.post("/", productController.createProduct)
productsApiRouter.put("/:id", productController.updateProductById)




export default productsApiRouter