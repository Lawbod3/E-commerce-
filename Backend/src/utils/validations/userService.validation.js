class userValidation {
  static async validateRegistration(data) {
    const allowfields = ["email", "password", "role"];
    const dataKeys = Object.keys(data);
    const extraKeys = dataKeys.filter((key) => !allowfields.includes(key));

    if (extraKeys.length > 0) {
      throw new Error("Unexpected fields");
    }

    if (!data.email) {
      throw new Error("Email is required");
    }
    if (!data.password) {
      throw new Error("Password is required");
    }
    if (data.password.length < 7) {
      throw new Error("Password lenghth should be at least 7 characters");
    }
  }

  static async validateLogin(data) {
    const allowfields = ["email", "password"];
    const dataKeys = Object.keys(data);
    const extraKeys = dataKeys.filter((key) => !allowfields.includes(key));

    if (extraKeys.length > 0) {
      throw new Error("Unexpected fields");
    }
    if (!data.email) {
      throw new Error("Email is required");
    }
    if (!data.password) {
      throw new Error("Password is required");
    }
  }
}

export default userValidation;
