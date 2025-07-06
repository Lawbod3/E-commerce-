import BaseRepository from "./base.repository";
import User from "../models/user.model.js";

class UserRepository extends BaseRepository {
  constructor() {
    super(User);
  }

  async create(data) {
    try {
      return await this.model.create(data);
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async findByEmail(email) {
    try {
      return await this.model.findOne({ email });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async banUser(userId) {
    try {
      return await this.model.findByIdAndUpdate(
        userId,
        { banned: true },
        { new: true }
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async unBanUser(userId) {
    try {
      return await this.model.findByIdAndUpdate(
        userId,
        { banned: false },
        { new: true }
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default new UserRepository();
