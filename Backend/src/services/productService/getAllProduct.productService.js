import ProductRepository from "../../data/repository/product.repository";

class AllProduct {
  async getAll() {
    return await ProductRepository.getAll();
  }
  async bySeller(sellerId) {
    return await ProductRepository.findBySellerId(sellerId);
  }
}
export default new AllProduct();
