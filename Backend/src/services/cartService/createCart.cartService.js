import CartRepository from "../../data/repository/cart.repository.js";
class CreateCart {
  async create(buyerId) {
    try {
      return await CartRepository.create({ buyerId });
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
export default new CreateCart();
