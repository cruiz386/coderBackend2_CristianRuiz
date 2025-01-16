import { Router } from "express"
import { productController } from "../../controllers/product.controller.js";
import { roleAuth } from '../../middlewares/roleAuth.js'
import { passportCall } from "../../passport/passportCall.js";
const productsApiRouter = Router();


productsApiRouter.get("/", [passportCall('current'),roleAuth('admin', 'user')], productController.getAllProducts)
productsApiRouter.get("/:id", [passportCall('current'),roleAuth('admin', 'user')],  productController.getProductById)
productsApiRouter.delete("/:id", [passportCall('current'),roleAuth('admin')],  productController.deleteProductById)
productsApiRouter.post("/", [passportCall('current'),roleAuth('admin')],  productController.createProduct)
productsApiRouter.put("/:id", [passportCall('current'),roleAuth('admin')],  productController.updateProductById)




export default productsApiRouter