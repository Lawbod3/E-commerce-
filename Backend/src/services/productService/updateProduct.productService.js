import ProductRepository from "../../data/repository/product.repository";
class UpdateProduct {
  async update(id, data) {
    return await ProductRepository.updateById(id, data, { new: true });
  }
}
export default new UpdateProduct();
