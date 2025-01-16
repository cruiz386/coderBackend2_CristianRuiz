
import { Router } from "express";
import  CartController  from "../../controllers/cart.controller.js";

const cartRouter = Router();
const cartController = new CartController();

cartRouter.post("/", cartController.createCart); 
cartRouter.get("/:cartId", cartController.getCart);
cartRouter.post("/:cartId/product", cartController.addProduct); 
cartRouter.delete("/:cartId/product/:productId", cartController.removeProduct); 
cartRouter.delete("/:cartId", cartController.clearCart); 


cartRouter.post("/:cartId/purchase", cartController.purchaseCart);

export default cartRouter;
