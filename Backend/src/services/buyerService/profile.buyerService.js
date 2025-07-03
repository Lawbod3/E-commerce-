import Buyer from "../../data/models/buyer.model.js";
import buyerRepository from "../../data/repository/buyer.repository.js";

class BuyerProfile {
  async getProfile(userId) {
    return await buyerRepository.findByUserId(userId);
  }
}
export default new BuyerProfile();
