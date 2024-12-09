import MongoDao from "./mongo.dao.js";
import { CartModel } from "../models/cart.model.js";

class CartDaoMongo extends MongoDao {
  constructor() {
    super(CartModel);
  }

  async addProduct(cartId, productId) {
    try {
      return await this.model.findByIdAndUpdate(
        cartId,
        { $push: { products: { productId, quantity: 1 } } },
        { new: true, upsert: true }
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteProduct(cartId, productId) {
    try {
      return await this.model.findByIdAndUpdate(
        cartId,
        { $pull: { products: { productId } } },
        { new: true }
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }

}


export const cartDao = new CartDaoMongo(CartModel);
