
import Services from "./service.manager.js";
import { cartDao } from "../daos/mongodb/cart.dao.js";

class CartService extends Services {
  async createCart() {
    try {
      const cart = await this.dao.create({ products: [] });
      if (!cart) throw new Error("Error creating cart");
      return cart;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getCart(userId) {
    try {
      const cart = await this.dao.getById(userId);
      if (!cart) throw new Error("Cart not found");
      return cart;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteCart(userId) {
    try {
      const cart = await this.dao.delete(userId);
      if (!cart) throw new Error("Cart not found or deleted");
      return cart;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  

  async addProductToCart(cartId, productId) {
    try {
      const cart = await this.dao.addProduct(cartId, productId);
      if (!cart) throw new Error("Cart not found or product not added");
      return cart;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteProductFromCart(cartId, productId) {
    try {
      const cart = await this.dao.deleteProduct(cartId, productId);
      if (!cart) throw new Error("Cart not found or product not deleted");
      return cart;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getCartProducts(cartId) {
    try {
      const cart = await this.dao.getById(cartId);
      if (!cart) throw new Error("Cart not found");
      return cart.products;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async calculateCartTotal(userId) {
    try {
      const cart = await this.dao.getById(userId);
      if (!cart) throw new Error("Cart not found or empty");
      const total = cart.products.reduce((acc, product) => acc + product.price, 0);
      return total;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export const cartService = new CartService(cartDao);
