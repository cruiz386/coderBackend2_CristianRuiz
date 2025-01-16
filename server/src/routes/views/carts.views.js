import { Router } from "express";
import  CartController  from "../../controllers/cart.controller.js";

const cartViewRouter = Router();

const cartController = new CartController(); 

cartViewRouter.get("/:cartId", (req, res) => {
    console.log("Cart ID:", req.params.cartId);
    cartController.showCart(req, res);
  });

export default cartViewRouter;