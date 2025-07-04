import sellerRepository from "../../data/repository/seller.repository.js";
import Seller from "../../data/models/seller.model.js";

class UpdateSeller {
  async profile(userId, updatedData) {
    return await sellerRepository.updateBuyer(userId, updatedData);
  }
}
export default new UpdateSeller();
