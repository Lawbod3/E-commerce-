import bcrypt from "bcrypt";

export const decryptPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};
