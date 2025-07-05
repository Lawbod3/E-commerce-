import ProductRepository from "../../data/repository/product.repository";
import ProductValidate from "../../utils/validations/productService.validation";
class UpdateProduct {
  async update(id, data) {
    try {
      await ProductValidate.updateProduct(data);
      return await ProductRepository.updateById(id, data, { new: true });
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
export default new UpdateProduct();
