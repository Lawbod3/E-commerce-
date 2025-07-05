import ProductRepository from "../../data/repository/product.repository";

class AllProduct {
  async getAll() {
    try {
      return await ProductRepository.getAll();
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async bySeller(sellerId) {
    try {
      return await ProductRepository.findBySellerId(sellerId);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
export default new AllProduct();
