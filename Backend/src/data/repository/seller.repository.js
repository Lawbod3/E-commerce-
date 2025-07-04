import BaseRepository from "./base.repository.js";
import Seller from "../models/seller.model.js";

class SellerRepository extends BaseRepository {
  constructor() {
    super(Seller);
  }

  async findByPhoneNumber(phoneNumber) {
    return await this.model.findOne({ phoneNumber });
  }

  async findByUserId(userId) {
    return await this.model.findOne({ userId });
  }

  async updateBuyer(userId, updatedData) {
    return await this.model.findOneAndUpdate({ userId }, updatedData, {
      new: true,
    });
  }
}

export default new SellerRepository();
