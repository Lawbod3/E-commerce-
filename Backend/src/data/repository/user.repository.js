import BaseRepository from "./base.repository";
import User from "../models/user.model";

class UserRepository extends BaseRepository {
  constructor() {
    super(User);
  }
  async findByEmail(email) {
    return this.model.findOne({ email });
  }

  async banUser(userId) {
    return this.model.findByIdAndUpdate(
      userId,
      { banned: true },
      { new: true }
    );
  }

  async unBanUser(userId) {
    return this.model.findByIdAndUpdate(
      userId,
      { banned: false },
      { new: true }
    );
  }
}

export default new UserRepository();
