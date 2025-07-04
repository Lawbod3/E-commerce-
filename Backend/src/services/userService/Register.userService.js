import userRepository from "../../data/repository/user.repository";
import userValidation from "../../utils/validations/userService.validation";
import { encryptPassword } from "../authService/authenticationService/password.encrypt.js";
class Register {
  async user(data) {
    await userValidation.validateRegistration(data);
    const user = await userRepository.findByEmail(data.email);
    if (user) {
      throw new Error("User already exists");
    }
    data.password = await encryptPassword(data.password);
    const createdUser = await userRepository.create(data);
    return createdUser;
  }
}

export default new Register();
