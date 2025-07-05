import ProductRepository from "../../data/repository/product.repository";

class DeleteProduct {
  async delete(id) {
    try {
      return await ProductRepository.setDeleteToTrue(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
export default new DeleteProduct();
