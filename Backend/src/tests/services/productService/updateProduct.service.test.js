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
import UpdateProduct from "../../../services/productService/updateProduct.productService.js";
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

test("that product can be Updated", async () => {
  const userData = {
    email: `test_${Date.now()}@example.com`,
    password: "testpassword",
    role: "admin",
  };
  const user = await Register.user(userData);
  const data = {
    userId: user._id,
    firstname: "John",
    lastname: "Doe",
    company: "Test Company",
    address: "123 Main St",
    phoneNumber: "1234567890",
  };
  const seller = await SellerReg.register(data);
  expect(seller).toBeTruthy();

  const productData = {
    quantity: 10,
    description: "This is a test product",
    price: 9.99,
    sellerId: seller._id,
    category: "ELECTRONICS",
    name: "Test Product",
  };

  const product = await CreateProduct.create(productData);
  expect(product).toBeTruthy();

  const updatedProductData = {
    quantity: 12,
    description: "This is a test product",
    price: 9.99,
    name: "Test Product",
  };

  const updatedProduct = await UpdateProduct.update(
    product._id,
    updatedProductData
  );
  expect(updatedProduct).toBeTruthy();
});

test("that product update can catch error in data", async () => {
  const userData = {
    email: `test_${Date.now()}@example.com`,
    password: "testpassword",
    role: "admin",
  };
  const user = await Register.user(userData);
  const data = {
    userId: user._id,
    firstname: "John",
    lastname: "Doe",
    company: "Test Company",
    address: "123 Main St",
    phoneNumber: "1234567890",
  };
  const seller = await SellerReg.register(data);
  expect(seller).toBeTruthy();

  const productData = {
    quantity: 10,
    description: "This is a test product",
    price: 9.99,
    sellerId: seller._id,
    category: "ELECTRONICS",
    name: "Test Product",
  };

  const product = await CreateProduct.create(productData);
  expect(product).toBeTruthy();

  const updatedProductData = {
    quantity: 12,
    description: "This is a test product",
    price: 9.99,
    sellerId: seller._id,
    category: "ELECTRONICS",
    name: "Test Product",
  };

  await expect(
    UpdateProduct.update(product._id, updatedProductData)
  ).rejects.toThrow("Unexpected fields or invalid fields");
});
