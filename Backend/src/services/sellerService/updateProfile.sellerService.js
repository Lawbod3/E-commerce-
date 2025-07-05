import sellerRepository from "../../data/repository/seller.repository.js";
import Seller from "../../data/models/seller.model.js";

class UpdateSeller {
  async profile(userId, updatedData) {
    try {
      return await sellerRepository.updateBuyer(userId, updatedData);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
export default new UpdateSeller();
