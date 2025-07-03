class buyerValidate {
  static async Registration(data) {
    const allowfields = [
      "userId",
      "firstname",
      "lastname",
      "phoneNumber",
      "address",
    ];
    const dataKeys = Object.keys(data);
    const extraKeys = dataKeys.filter((key) => !allowfields.includes(key));

    if (extraKeys.length > 0) {
      throw new Error("Unexpected fields");
    }
    if (!data.userId) {
      throw new Error("userId is required");
    }
    if (!data.firstname) {
      throw new Error("firstname is required");
    }
    if (!data.lastname) {
      throw new Error("lastname is required");
    }
    if (!data.phoneNumber) {
      throw new Error("phoneNumber is required");
    }
    if (!data.address) {
      throw new Error("address is required");
    }
  }
}

export default buyerValidate;
