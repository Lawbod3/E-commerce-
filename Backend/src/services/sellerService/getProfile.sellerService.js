import Seller from "../../data/models/seller.model.js";
import sellerRepository from "../../data/repository/seller.repository.js";

class SellerProfile {
  async getProfile(userId) {
    try {
      return await sellerRepository.findByUserId(userId);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
export default new SellerProfile();
