import BaseRepository from "./base.repository.js";
import Seller from "../models/seller.model.js";

class SellerRepository extends BaseRepository {
  constructor() {
    super(Seller);
  }

  async findByUserId(userId) {
    return this.model.findOne({ userId });
  }
}

export default new SellerRepository();
