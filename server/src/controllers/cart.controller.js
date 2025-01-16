import { cartService } from "../services/cart.service.js";
import { TicketService } from "../services/ticket.service.js";
import { sendGmailPurchase } from "./email.controller.js";
import { UserModel } from '../daos/models/user.model.js';

const ticketService = new TicketService();

export default class CartController {
  async createCart(req, res) {
    try {
      const cart = await cartService.createCart();
      res.status(201).json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getCart(req, res) {
    try {
      const { cartId } = req.params;
      const cart = await cartService.getCart(cartId);
      res.status(200).json(cart);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async addProduct(req, res) {
    try {
      const { cartId } = req.params;
      const { productId, quantity } = req.body;
      const updatedCart = await cartService.addProduct(cartId, productId, quantity);
      res.status(200).json(updatedCart);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async removeProduct(req, res) {
    try {
      const { cartId, productId } = req.params;
      const updatedCart = await cartService.removeProduct(cartId, productId);
      res.status(200).json(updatedCart);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateProduct(req, res) {
    try {
      const { cartId, productId } = req.params;
      const { quantity } = req.body;
      const updatedCart = await cartService.updateProduct(cartId, productId, quantity);
      res.status(200).json(updatedCart);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async clearCart(req, res) {
    try {
      const { cartId } = req.params;
      const updatedCart = await cartService.clearCart(cartId);
      res.status(200).json(updatedCart);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async purchaseCart(req, res) {
    try {
      const { cartId } = req.params;

      const { purchaser, name } = req.body;
      const user = await UserModel.findOne({ email: purchaser });
      if (!purchaser || !name) {
        throw new Error("Purchaser email and name are required to create a ticket.");
      }

      const cart = await cartService.getCart(cartId);
      if (!cart) throw new Error("Cart not found");


      const { processedProducts, failedProducts, totalAmount } = await cartService.purchaseCart(cartId);

      if (processedProducts.length > 0) {

        await ticketService.createTicket({
          purchaser: user.email,
          amount: totalAmount,
          products: processedProducts,
        });


        const emailBody = {
          dest: user.email,
          name: user.first_name,
          subject: "Resumen de tu compra",
          html: `
                    <h1>¡Gracias por tu compra, ${user.first_name}!</h1>
                    <p>Este es el resumen de tu compra:</p>
                    <ul>
                        ${processedProducts.map(
            (product) => `
                                <li>
                                    <strong>${product.title}</strong> - ${product.quantity} unidad(es) - $${product.price * product.quantity}
                                </li>
                            `
          ).join('')}
                    </ul>
                    <p><strong>Total: $${totalAmount}</strong></p>
                    <p>Esperamos que disfrutes tu compra.</p>
                `,
        };


        await sendGmailPurchase(emailBody);
      }

      res.status(200).json({
        message: "Purchase completed.",
        processedProducts,
        failedProducts,
      });
    } catch (error) {
      console.error('Error en purchaseCart:', error);
      res.status(500).json({ error: error.message });
    }
  }


  async showCart(req, res) {
    try {
      const { cartId } = req.params;
      const cart = await cartService.getCart(cartId);

      const cartObject = cart.toObject();

      cartObject.products = cartObject.products.map(item => {
        return {
          title: item.product.title,
          price: item.product.price,
          quantity: item.quantity,
          subtotal: item.product.price * item.quantity,
          photo: item.product.photo
        };

      });

      const total = cartObject.products.reduce((sum, item) => sum + item.subtotal, 0);

      cartObject.total = total;


      res.render("cart", { cart: cartObject });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

}
