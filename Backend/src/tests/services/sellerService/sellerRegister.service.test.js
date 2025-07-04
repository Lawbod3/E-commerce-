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
import SellerReg from "../../../services/sellerService/createProfile.sellerService.js";
import Seller from "../../../data/models/seller.model.js";
import User from "../../../data/models/user.model.js";
import Register from "../../../services/userService/Register.userService.js";

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
});

afterEach(async () => {
  await User.deleteMany({});
  await Seller.deleteMany({});
});

test("that Seller can create profile", async () => {
  const userData = {
    email: "bode@example.com",
    password: `test_${Date.now()}@example.com`,
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
  const createdSeller = await SellerReg.register(data);
  expect(createdSeller).toBeTruthy();
});

test("that seller registration can catch error in data that dont include firstname", async () => {
  const userData = {
    email: `test_${Date.now()}@example.com`,
    password: "testpassword",
    role: "admin",
  };
  const user = await Register.user(userData);
  const data = {
    userId: user._id,
    lastname: "Doe",
    company: "Test Company",
    address: "123 Main St",
    phoneNumber: "1234567890",
  };

  await expect(SellerReg.register(data)).rejects.toThrow(
    "firstname is required"
  );
});

test("that seller registration can catch error in data that dont include lastname", async () => {
  const userData = {
    email: `test_${Date.now()}@example.com`,
    password: "testpassword",
    role: "admin",
  };
  const user = await Register.user(userData);
  const data = {
    userId: user._id,
    firstname: "John",
    company: "Test Company",
    address: "123 Main St",
    phoneNumber: "1234567890",
  };

  await expect(SellerReg.register(data)).rejects.toThrow(
    "lastname is required"
  );
});

test("that seller registration can catch error in data that dont include userId", async () => {
  const data = {
    firstname: "John",
    lastname: "Doe",
    company: "Test Company",
    address: "123 Main St",
    phoneNumber: "1234567890",
  };

  await expect(SellerReg.register(data)).rejects.toThrow("userId is required");
});

test("that seller registration can catch error in data that dont include address ", async () => {
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
    phoneNumber: "1234567890",
  };

  await expect(SellerReg.register(data)).rejects.toThrow("address is required");
});

test("that seller registration can catch error in data that dont include phoneNumber", async () => {
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
  };

  await expect(SellerReg.register(data)).rejects.toThrow(
    "phoneNumber is required"
  );
});

test("that seller registration can catch field error", async () => {
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
    phoneNumber: "122234567890",
    wrongFields: "wrongFields",
  };

  await expect(SellerReg.register(data)).rejects.toThrow("Unexpected fields");
});
