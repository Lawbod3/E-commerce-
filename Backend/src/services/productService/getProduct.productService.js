import ProductRepository from "../../data/repository/product.repository";

class GetProduct {
  async byId(id) {
    try {
      return await ProductRepository.findById(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async bySellerId(sellerId) {
    try {
      return await ProductRepository.findBySellerId(sellerId);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default new GetProduct();
