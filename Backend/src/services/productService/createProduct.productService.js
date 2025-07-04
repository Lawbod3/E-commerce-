import ProductRepository from "../../data/repository/product.repository";
import ProductValidate from "../../utils/validations/productService.validation";

class CreateProduct {
  async create(data) {
    await ProductValidate.createProduct(data);
    return await ProductRepository.create(data);
  }
}
export default new CreateProduct();
