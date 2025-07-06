import BaseRepository from "./base.repository.js";
import Seller from "../models/seller.model.js";

class SellerRepository extends BaseRepository {
  constructor() {
    super(Seller);
  }

  async findByPhoneNumber(phoneNumber) {
    try {
      return await this.model.findOne({ phoneNumber });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findByUserId(userId) {
    try {
      return await this.model.findOne({ userId });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateBuyer(userId, updatedData) {
    try {
      return await this.model.findOneAndUpdate({ userId }, updatedData, {
        new: true,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default new SellerRepository();
