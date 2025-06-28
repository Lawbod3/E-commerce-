import BaseRepository from "./base.repository.js";
import Buyer from "../models/buyer.model.js";

class BuyerRepository extends BaseRepository {
  constructor() {
    super(Buyer);
  }

  async banBuyer(id) {
    return this.model.findByIdAndUpdate(id, { banned: true }, { new: true });
  }

  async unbanBuyer(id) {
    return this.model.findByIdAndUpdate(id, { banned: false }, { new: true });
  }
}

export default new BuyerRepository();
