export default class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    try {
      return await this.model.create(data);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findById(id) {
    try {
      return await this.model.findById(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findAll(filter = {}) {
    try {
      return await this.model.find(filter);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateById(id, updatedData) {
    try {
      return await this.model.findByIdAndUpdate(id, updatedData, { new: true });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteById(id) {
    try {
      return await this.model.deleteByIdAndDelete(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteAll() {
    try {
      return await this.model.deleteMany({});
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
