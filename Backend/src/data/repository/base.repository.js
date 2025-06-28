export default class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    return this.model.create(data);
  }

  async findById(id) {
    return this.model.findById(id);
  }

  async findAll(filter = {}) {
    return this.model.findAll(filter);
  }

  async updateById(id, updatedData) {
    return this.model.findByIdAndUpdate(id, updatedData, { new: true });
  }

  async deleteById(id) {
    return this.model.deleteById(id);
  }
}
