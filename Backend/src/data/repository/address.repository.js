import BaseRepository from "./base.repository.js";
import Address from "../../models/address.model.js";

class AddressRepository extends BaseRepository {
  constructor() {
    super(Address);
  }

  async findByUserId(userId) {
    return this.model.find({ userId });
  }
}

export default new AddressRepository();
