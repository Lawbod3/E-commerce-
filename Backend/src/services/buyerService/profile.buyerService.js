import Buyer from "../../data/models/buyer.model.js";
import buyerRepository from "../../data/repository/buyer.repository.js";

class BuyerProfile {
  async getProfile(userId) {
    try {
      return await buyerRepository.findByUserId(userId);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
export default new BuyerProfile();
