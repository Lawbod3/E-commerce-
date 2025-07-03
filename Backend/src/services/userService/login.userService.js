import userValidation from "../../utils/validations/userService.validation.js";
import userRepository from "../../data/repository/user.repository.js";
import { decryptPassword } from "../../utils/security/password.decrypt.js";

class Login {
  async user(data) {
    await userValidation.validateLogin(data);
    const user = await userRepository.findByEmail(data.email);
    if (!user) {
      throw new Error("User not found");
    }
    const isPasswordValid = await decryptPassword(data.password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }
    return user;
  }
}

export default new Login();
