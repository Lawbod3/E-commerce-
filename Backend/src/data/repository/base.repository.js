export default class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    return await this.model.create(data);
  }

  async findById(id) {
    return await this.model.findById(id);
  }

  async findAll(filter = {}) {
    return await this.model.find(filter);
  }

  async updateById(id, updatedData) {
    return await this.model.findByIdAndUpdate(id, updatedData, { new: true });
  }

  async deleteById(id) {
    return await this.model.deleteByIdAndDelete(id);
  }

  async deleteAll() {
    return await this.model.deleteMany({});
  }
}
