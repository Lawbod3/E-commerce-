import BaseRepository from "./base.repository.js";
import Admin from "../models/admin.model.js";

class AdminRepository extends BaseRepository {
  constructor() {
    super(Admin);
  }

  async banAdmin(id) {
    return this.model.findByIdAndUpdate(id, { banned: true }, { new: true });
  }

  async unbanAdmin(id) {
    return this.model.findByIdAndUpdate(id, { banned: false }, { new: true });
  }
}

export default new AdminRepository();
