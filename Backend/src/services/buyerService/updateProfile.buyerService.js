import buyerRepository from "../../data/repository/buyer.repository.js";
import Buyer from "../../data/models/buyer.model.js";
class UpdateBuyer {
  async profile(userId, data) {
    try {
      return await buyerRepository.updateBuyer(userId, data);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
export default new UpdateBuyer();
