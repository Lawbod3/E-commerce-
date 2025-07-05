import ProductRepository from "../../data/repository/product.repository";

class GetProduct {
  async byId(id) {
    return await ProductRepository.findById(id);
  }

  async bySellerId(sellerId) {
    return await ProductRepository.findBySellerId(sellerId);
  }
}

export default new GetProduct();
