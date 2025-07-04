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
});

test("that create product can catch error in data", async () => {
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
  };

  await expect(CreateProduct.create(productData)).rejects.toThrow(
    "name is required"
  );
});

test("that create product can catch error in data", async () => {
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
    name: "iron",
    description: "This is a test product",
    price: 9.99,
    sellerId: seller._id,
    category: "ELECTRONICS",
  };

  await expect(CreateProduct.create(productData)).rejects.toThrow(
    "quantity is required"
  );
});

test("that create product can catch error in data", async () => {
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
    name: "iron",
    quantity: 10,
    price: 9.99,
    category: "ELECTRONICS",
    description: "This is a test product",
  };

  await expect(CreateProduct.create(productData)).rejects.toThrow(
    "seller id is required"
  );
});

test("that create product can catch error in data", async () => {
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
    name: "iron",
    quantity: 10,
    price: 9.99,
    sellerId: seller._id,
    description: "This is a test product",
  };

  await expect(CreateProduct.create(productData)).rejects.toThrow(
    "category is required"
  );
});

test("that create product can catch error in data", async () => {
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
    name: "iron",
    quantity: 10,
    sellerId: seller._id,
    category: "ELECTRONICS",
    description: "This is a test product",
  };

  await expect(CreateProduct.create(productData)).rejects.toThrow(
    "price is required"
  );
});

test("that create product can catch price error if negative or equal to 0", async () => {
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
    name: "iron",
    quantity: 10,
    sellerId: seller._id,
    category: "ELECTRONICS",
    description: "This is a test product",
    price: -1,
  };

  await expect(CreateProduct.create(productData)).rejects.toThrow(
    "price should be greater than 0"
  );
});

test("that create product can catch error in data", async () => {
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
    name: "iron",
    quantity: 10,
    sellerId: seller._id,
    category: "ELECTRONICS",
    price: 9.99,
  };

  await expect(CreateProduct.create(productData)).rejects.toThrow(
    "description is required"
  );
});

test("that create product dont take invalid fields", async () => {
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
    name: "iron",
    quantity: 10,
    sellerId: seller._id,
    category: "ELECTRONICS",
    description: "This is a test product",
    price: 9.99,
    invalidField: "invalid",
  };

  await expect(CreateProduct.create(productData)).rejects.toThrow(
    "Unexpected fields or invalid fields"
  );
 
});
