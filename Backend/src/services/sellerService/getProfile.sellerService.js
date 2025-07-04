import Seller from "../../data/models/seller.model.js";
import sellerRepository from "../../data/repository/seller.repository.js";

class SellerProfile {
  async getProfile(userId) {
    return await sellerRepository.findByUserId(userId);
  }
}
export default new SellerProfile();
