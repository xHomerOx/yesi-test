import CartDao from "../dao/cartDao.js";
import cartDTO from "../dao/DTOs/cartDto.js";

export default class cartRepository {
  constructor() {
    this.cartDao = new CartDao();
  }

  async getAllCarts() {
    try {
      return await this.cartDao.getAll();
    } catch (error) {
      console.error(error.message);
      throw new Error("Error fetching carts");
    }
  }

  async createCart() {
    try {
      const newCartDTO = new cartDTO({ products: [] });
      const newCart = await this.cartDao.create(newCartDTO);
      return newCart;
    } catch (error) {
      console.error(error.message);
      throw new Error("Error creating cart");
    }
  }

  async getProductsFromCartByID(cid) {
    try {
      const products = await this.cartDao.getById(cid);
      return new cartDTO(products);
    } catch (error) {
      throw new Error(`Products not found in ${cid}`);
    }
  }

  async addProductToCart(cartid, productId, quantity = 1) {
    try {
      const cart = await this.cartDao.addCart(cartid);
      if (!cart) throw new Error(`Cart with ID ${cartid} not found`);

      console.log("Cart retrieved:", cart); // Logging the cart

      const existingProduct = cart.products.find(
        (product) => product.product.toString() === productId.toString()
      );

      console.log("Existing product:", existingProduct); // Logging the existing product

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.products.push({ product: productId, quantity });
      }

      await cart.save();
      return cart;
    } catch (error) {
      console.error(error.message);
      throw new Error("Error adding product to cart");
    }
  }

  async updateProductQuantity(cartId, productId, quantity) {
    try {
      return await this.cartDao.updateQuantity(
        { cartId, productId },
        { quantity }
      );
    } catch (error) {
      console.error(error.message);
      throw new Error("Error updating product quantity");
    }
  }

  async deleteCart(id) {
    try {
      return await this.cartDao.delete(id);
    } catch (error) {
      console.error(error.message);
      throw new Error("Error deleting cart");
    }
  }

  async deleteAllProductsFromCart(cartId) {
    try {
      return await this.cartDao.deleteProducts(cartId);
    } catch (error) {
      console.error(error.message);
      throw new Error("Error deleting all products from cart");
    }
  }

  async deleteProductFromCart(cartId, productId) {
    try {
      return await this.cartDao.deleteProduct(cartId, productId);
    } catch (error) {
      console.error(error.message);
      throw new Error("Error deleting product from cart");
    }
  }

  async getStockfromProducts(cid) {
    try {
      const results = await this.dao.getStockfromProducts(cid);
      return new cartDTO(results);
    } catch (error) {
      console.log(error);
      throw new Error(`Could not add products to ${cid}`);
    }
  }
}
