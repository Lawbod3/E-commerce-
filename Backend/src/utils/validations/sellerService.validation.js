class ValidateSeller {
  static async registration(data) {
    const allowfields = [
      "userId",
      "firstname",
      "lastname",
      "address",
      "phoneNumber",
      "companyName",
    ];
    const dataKeys = Object.keys(data);
    const extraKeys = dataKeys.filter((key) => !allowfields.includes(key));

    if (extraKeys.length > 1) {
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

    if (!data.address) {
      throw new Error("address is required");
    }

    if (!data.phoneNumber) {
      throw new Error("phoneNumber is required");
    }
  }
}
export default ValidateSeller;
