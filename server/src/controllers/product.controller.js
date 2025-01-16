import Controllers from "./controller.manager.js";
import { prodService } from "../services/product.service.js";


class ProductController extends Controllers {
  constructor() {
    super(prodService);
  }

  getAllProducts = async (req, res, next) => {
    try {
      const products = await this.service.getAll();
      const { value } = req.query;


      const filteredProducts = value
        ? products.filter((p) => p.price < parseInt(value, 10))
        : products;

      res.json(filteredProducts);
    } catch (error) {
      next(error);
    }
  };

  getProductById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await this.service.getById(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  };
  createProduct = async (req, res, next) => {
    try {
      const product = await this.service.create(req.body);
      res.json(product);
    } catch (error) {
      next(error);
    }
  };

  updateProductById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await this.service.update(id, req.body);
      res.json(product);
    } catch (error) {
      next(error);
    }
  };

  deleteProductById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await this.service.delete(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  };

  showProducts = async (req, res, next) => {
    try {
      const products = await this.service.getAll();
      const { value } = req.query;

      const filteredProducts = value
        ? products.filter((p) => p.price < parseInt(value, 10))
        : products;


      const mapFilteredProducts = filteredProducts.map((p) => p.toObject());
      res.render("products", { products: mapFilteredProducts });

    } catch (error) {
      next(error);
    }
  };

}

export const productController = new ProductController();
