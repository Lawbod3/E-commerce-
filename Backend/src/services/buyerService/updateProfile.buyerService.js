import buyerRepository from "../../data/repository/buyer.repository.js";
import Buyer from "../../data/models/buyer.model.js";
class UpdateBuyer {
  async profile(userId, data) {
    return await buyerRepository.updateBuyer(userId, data);
  }
}
export default new UpdateBuyer();
