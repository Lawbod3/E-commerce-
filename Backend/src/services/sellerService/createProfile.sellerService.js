import Seller from "../../data/models/seller.model.js";
import sellerRepository from "../../data/repository/seller.repository.js";
import userRepository from "../../data/repository/user.repository.js";
import ValidateSeller from "../../utils/validations/sellerService.validation.js";

class SellerReg {
  async register(data) {
    await ValidateSeller.registration(data);
    const user = await userRepository.findById(data.userId);
    if (!user) {
      throw new Error("User does not exist");
    }
    const seller = await sellerRepository.create(data);
    if (!seller) {
      throw new Error("Failed to create seller profile");
    }
    return seller;
  }
}
export default new SellerReg();
