import BaseRepository from "./base.repository.js";
import Buyer from "../models/buyer.model.js";

class BuyerRepository extends BaseRepository {
  constructor() {
    super(Buyer);
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

export default new BuyerRepository();
