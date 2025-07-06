import CartRepository from "../../data/repository/cart.repository.js";
import ProductRepository from "../../data/repository/product.repository.js";
import BuyerRepository from "../../data/repository/buyer.repository.js";

class AddToCart {
  async buyerCart(buyerId, productId) {
    try {
      const buyer = await BuyerRepository.findById(buyerId);
      if (!buyer) throw new Error("Buyer not found");
      const product = await ProductRepository.findById(productId);
      if (!product) throw new Error("Product not found");
      const cart = await CartRepository.findByBuyerId(buyerId);
      if (!cart) throw new Error("Cart not found");
      return await CartRepository.addToCart(buyerId, productId);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
export default new AddToCart();
