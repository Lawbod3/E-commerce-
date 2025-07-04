import ProductRepository from "../../data/repository/product.repository";

class CreateProduct {
  async create(data) {
    return await ProductRepository.create(data);
  }
}
export default new CreateProduct();
