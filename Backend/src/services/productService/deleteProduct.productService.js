import ProductRepository from "../../data/repository/product.repository";

class DeleteProduct {
  async delete(id) {
    return await ProductRepository.setDeleteToTrue(id);
  }
}
export default new DeleteProduct();
