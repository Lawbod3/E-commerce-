import ProductRepository from "../../data/repository/product.repository";
import ProductValidate from "../../utils/validations/productService.validation";

class CreateProduct {
  async create(data) {
    try {
      await ProductValidate.createProduct(data);
      return await ProductRepository.create(data);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
export default new CreateProduct();
