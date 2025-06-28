import BaseRepository from "./base.repository.js";
import ShoppingCart from "../../models/shoppingCart.model.js";

class CartRepository extends BaseRepository {
  constructor() {
    super(ShoppingCart);
  }

  async findByBuyerId(buyerId) {
    return this.model.findOne({ buyerId });
  }
}

export default new CartRepository();
