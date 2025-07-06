import BaseRepository from "./base.repository.js";
import ShoppingCart from "../models/shoppingCart.model.js";

class CartRepository extends BaseRepository {
  constructor() {
    super(ShoppingCart);
  }

  async findByBuyerId(buyerId) {
    try {
      return await this.model.findOne({ buyerId });
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default new CartRepository();
