import buyerRepository from "../../data/repository/buyer.repository.js";
import buyerValidate from "../../utils/validations/buyerService.validation.js";
import userRepository from "../../data/repository/user.repository.js";

class BuyerReg {
  async register(data) {
    await buyerValidate.Registration(data);
    const user = await userRepository.findById(data.userId);
    if (!user) {
      throw new Error("User does not exist");
    }
    const createdBuyer = await buyerRepository.create(data);
    return createdBuyer;
  }
}

export default new BuyerReg();
