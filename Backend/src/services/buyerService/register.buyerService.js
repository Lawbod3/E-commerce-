import buyerRepository from "../../data/repository/buyer.repository.js";
import buyerValidate from "../../utils/validations/buyerService.validation.js";
import userRepository from "../../data/repository/user.repository.js";

class BuyerReg {
  async register(data) {
    try {
      await buyerValidate.Registration(data);
      const user = await userRepository.findById(data.userId);
      if (!user) throw new Error("User does not exist");
      const createdBuyer = await buyerRepository.create(data);
      return createdBuyer;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default new BuyerReg();
