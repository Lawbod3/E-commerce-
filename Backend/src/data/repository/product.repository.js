import BaseRepository from "./base.repository.js";
import Product from "../models/product.model.js";

class ProductRepository extends BaseRepository {
  constructor() {
    super(Product);
  }

  async findBySellerId(sellerId) {
    return await this.model.find({ sellerId });
  }

  async findByCategory(category) {
    return await this.model.find({ category });
  }
}

export default new ProductRepository();
