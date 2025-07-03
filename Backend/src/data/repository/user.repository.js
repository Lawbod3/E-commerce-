import BaseRepository from "./base.repository";
import User from "../models/user.model.js";

class UserRepository extends BaseRepository {
  constructor() {
    super(User);
  }

  async create(data) {
    return await this.model.create(data);
  }
  async findByEmail(email) {
    return await this.model.findOne({ email });
  }

  async banUser(userId) {
    return await this.model.findByIdAndUpdate(
      userId,
      { banned: true },
      { new: true }
    );
  }

  async unBanUser(userId) {
    return await this.model.findByIdAndUpdate(
      userId,
      { banned: false },
      { new: true }
    );
  }
}

export default new UserRepository();
