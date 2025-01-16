import mongoose from "mongoose";
import { CartModel } from "../models/cart.model.js";

class CartDAO {
  async createCart() {
    const newCart = await CartModel.create({ products: [] });
    return newCart;
  }


    async getCartById(cartId) {
      if (!mongoose.Types.ObjectId.isValid(cartId)) {
        throw new Error("Invalid Cart ID");
      }
      const cart = await CartModel.findById(cartId).populate("products.product");
      if (!cart) throw new Error("Cart not found");
      return cart;
    }

  async addProductToCart(cartId, productId, quantity) {
    const cart = await CartModel.findById(cartId);
    const productIndex = cart.products.findIndex(
      (p) => p.product.toString() === productId
    );

    if (productIndex !== -1) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }

    await cart.save();
    return cart;
  }

  async removeProductFromCart(cartId, productId) {
    const cart = await CartModel.findById(cartId);
    cart.products = cart.products.filter(
      (p) => p.product.toString() !== productId
    );
    await cart.save();
    return cart;
  }

  async clearCart(cartId) {
    const cart = await CartModel.findById(cartId);
    cart.products = [];
    await cart.save();
    return cart;
  }

  async updateCart(cartId, updatedProducts) {
    const cart = await CartModel.findById(cartId);
    cart.products = updatedProducts;
    await cart.save();
    return cart;
  }
}

export const cartDAO = new CartDAO();
