import {
  test,
  expect,
  beforeEach,
  afterEach,
  beforeAll,
  afterAll,
} from "vitest";

import mongoose from "mongoose";
import dotenv from "dotenv";
import CreateProduct from "../../../services/productService/createProduct.productService.js";
import Product from "../../../data/models/product.model.js";
import Seller from "../../../data/models/seller.model.js";
import User from "../../../data/models/user.model.js";
import Register from "../../../services/userService/Register.userService.js";
import SellerReg from "../../../services/sellerService/createProfile.sellerService.js";
import DeleteProduct from "../../../services/productService/deleteProduct.productService.js";

dotenv.config();

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
  await mongoose.connection.close();
});

beforeEach(async () => {
  await User.deleteMany({});
  await Seller.deleteMany({});
  await Product.deleteMany({});
});

test("that product can be created", async () => {
  const userData = {
    email: `test_${Date.now()}@example.com`,
    password: "testpassword",
    role: "admin",
  };
  const user = await Register.user(userData);
  const data = {
    userId: user._id,
    firstname: "tonny",
    lastname: "Doe",
    company: "Test Company",
    address: "123 Main St",
    phoneNumber: "122234567890",
  };
  const seller = await SellerReg.register(data);
  expect(seller).toBeTruthy();

  const productData = {
    quantity: 11,
    description: "This is a test product",
    price: 9.99,
    sellerId: seller._id,
    category: "ELECTRONICS",
    name: "Test Product",
  };

  const product = await CreateProduct.create(productData);
  expect(product).toBeTruthy();

  const deletedProduct = await DeleteProduct.delete(product._id);
  console.log("deleted product is" + deletedProduct);
  expect(deletedProduct).toBeTruthy();
  expect(deletedProduct.delete).toBe(true);
});
