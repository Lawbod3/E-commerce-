import BaseRepository from "./base.repository.js";
import Buyer from "../models/buyer.model.js";

class BuyerRepository extends BaseRepository {
  constructor() {
    super(Buyer);
  }

  async findByUserId(userId) {
    return this.model.findOne({ userId });
  }
}

export default new BuyerRepository();
