class ProductValidate {
  static async createProduct(data) {
    const allowFields = [
      "name",
      "quantity",
      "sellerId",
      "category",
      "price",
      "description",
    ];
    const dataKeys = Object.keys(data);
    const invalidFields = dataKeys.filter(
      (field) => !allowFields.includes(field)
    );
    if (invalidFields.length > 0) {
      throw new Error("Unexpected fields or invalid fields");
    }
    if (!data.name) {
      throw new Error("name is required");
    }
    if (!data.quantity) {
      throw new Error("quantity is required");
    }

    if (!data.sellerId) {
      throw new Error("seller id is required");
    }

    if (!data.category) {
      throw new Error("category is required");
    }

    if (data.price < 1) {
      throw new Error("price should be greater than 0");
    }

    if (!data.price) {
      throw new Error("price is required");
    }

    if (!data.description) {
      throw new Error("description is required");
    }
  }

  static async updateProduct(data) {
    const allowFields = ["name", "quantity", "price", "description"];
    const dataKeys = Object.keys(data);
    const invalidFields = dataKeys.filter(
      (field) => !allowFields.includes(field)
    );
    if (invalidFields.length > 0) {
      throw new Error("Unexpected fields or invalid fields");
    }
  }
}
export default ProductValidate;
