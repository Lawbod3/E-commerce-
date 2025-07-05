import ProductRepository from "../../data/repository/product.repository";

class AllProduct {
  async getAll() {
    return await ProductRepository.getAll();
  }
}
export default new AllProduct();
