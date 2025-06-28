import BaseRepository from "./base.repository.js";
import Product from "../models/product.model.js";

class ProductRepository extends BaseRepository {
  constructor() {
    super(Product);
  }

  async findBySellerId(sellerId) {
    return this.model.find({ sellerId });
  }

  async findByCategory(category) {
    return this.model.find({ category });
  }
}

export default new ProductRepository();
