import BaseRepository from "./base.repository.js";
import Buyer from "../models/buyer.model.js";

class BuyerRepository extends BaseRepository {
  constructor() {
    super(Buyer);
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

export default new BuyerRepository();
