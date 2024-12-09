import { cartService } from "../services/cart.service.js";


export const create = async (req, res) => {
  try {
    const newCart = await cartService.createCart();
    res.status(201).json({ message: "Cart created successfully", cart: newCart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const readAll = async (req, res) => {
  try {
    const carts = await cartService.getAll();
    res.status(200).json({ carts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const read = async (req, res) => {
  try {
    const { cid } = req.params;
    const products = await cartService.getCartProducts(cid);
    res.status(200).json({ message: "Products retrieved successfully", products });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};


export const update = async (req, res) => {
  try {
    const { cid } = req.params;
    const { productId } = req.body; 
    const updatedCart = await cartService.addProductToCart(cid, productId);
    res.status(200).json({ message: "Product added to cart", cart: updatedCart });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


export const destroy = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const updatedCart = await cartService.deleteProductFromCart(cid, pid);
    res.status(200).json({ message: "Product removed from cart", cart: updatedCart });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const calculateTotal = async (req, res) => {
  try {
    const { uid } = req.params;
    const total = await cartService.calculateCartTotal(uid);
    res.status(200).json({ message: "Total calculated successfully", total });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
