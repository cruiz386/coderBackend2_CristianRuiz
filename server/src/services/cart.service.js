import { cartDAO } from "../daos/mongodb/cart.dao.js";
import { prodDao } from "../daos/mongodb/product.dao.js";
import { UserModel } from '../daos/models/user.model.js';


class CartService {
  async createCart() {
    return await cartDAO.createCart();
  }

  async getCart(cartId) {
    const cart = await cartDAO.getCartById(cartId);

    if (!cart) throw new Error("Cart not found");

    // Calcular el total del carrito
    cart.total = cart.products.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);

    return cart;
  }


  async addProduct(cartId, productId, quantity = 1) {
    return await cartDAO.addProductToCart(cartId, productId, quantity);
  }

  async removeProduct(cartId, productId) {
    return await cartDAO.removeProductFromCart(cartId, productId);
  }

  async clearCart(cartId) {
    return await cartDAO.clearCart(cartId);
  }

  async purchaseCart(cartId) {
    const cart = await cartDAO.getCartById(cartId);
    const { purchaser } = cart;
    if (!cart) throw new Error("Cart not found");


    const user = await UserModel.findOne({ cart: cartId });
    if (!user) throw new Error("User not found");

    const processedProducts = [];
    const failedProducts = [];
    let totalAmount = 0;

    for (const cartItem of cart.products) {
      const product = await prodDao.getProductById(cartItem.product);

      if (product.stock >= cartItem.quantity) {
        product.stock -= cartItem.quantity;
        await product.save();

        processedProducts.push({
          product: product._id,
          title: product.title,
          quantity: cartItem.quantity,
          price: product.price,
        });

        totalAmount += product.price * cartItem.quantity;
      } else {
        failedProducts.push(cartItem.product.toString());
      }
    }


    cart.products = cart.products.filter((item) =>
      failedProducts.includes(item.product.toString())
    );
    await cart.save();

    return { processedProducts, failedProducts, totalAmount, user };
  }


  async updateCart(cartId, updatedProducts) {
    try {

      const cart = await cartDAO.findByIdAndUpdate(cartId, { products: updatedProducts }, { new: true });
      return cart;
    } catch (error) {
      throw new Error('Error updating cart: ' + error.message);
    }
  }


}

export const cartService = new CartService();