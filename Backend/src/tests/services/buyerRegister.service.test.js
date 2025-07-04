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
import BuyerReg from "../../services/buyerService/register.buyerService";
import Buyer from "../../data/models/buyer.model.js";
import User from "../../data/models/user.model.js";
import Register from "../../services/userService/Register.userService.js";

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
  await Buyer.deleteMany({});
});

afterEach(async () => {
  await User.deleteMany({});
  await Buyer.deleteMany({});
});

test("BuyerService can Register buyer", async () => {
  const userData = {
    email: `test_${Date.now()}@example.com`,
    password: "testPassword",
    role: "admin",
  };

  const user = await Register.user(userData);

  const data = {
    userId: user._id,
    firstname: "John",
    lastname: "Doe",
    phoneNumber: "1234567890",
    address: "123 Main St",
  };

  const buyer = await BuyerReg.register(data);
  expect(buyer).toBeTruthy();
});

test("BuyerReg can catch error in data", async () => {
  const userData = {
    email: "bode@example.com",
    password: `test_${Date.now()}@example.com`,
    role: "admin",
  };
  const user = await Register.user(userData);
  const data = {
    firstname: "John",
    lastname: "Doe",
    phoneNumber: "1234567890",
    address: "123 Main St",
  };

  await expect(BuyerReg.register(data)).rejects.toThrow("userId is required");
});

test("BuyerReg can catch error in data", async () => {
  const userData = {
    email: "bode@example.com",
    password: `test_${Date.now()}@example.com`,
    role: "admin",
  };
  const user = await Register.user(userData);
  const data = {
    userId: user._id,
    lastname: "Doe",
    phoneNumber: "1234567890",
    address: "123 Main St",
  };

  await expect(BuyerReg.register(data)).rejects.toThrow(
    "firstname is required"
  );
});

test("BuyerReg can catch error in data", async () => {
  const userData = {
    email: "bode@example.com",
    password: `test_${Date.now()}@example.com`,
    role: "admin",
  };
  const user = await Register.user(userData);
  const data = {
    userId: user._id,
    firstname: "John",
    phoneNumber: "1234567890",
    address: "123 Main St",
  };

  await expect(BuyerReg.register(data)).rejects.toThrow("lastname is required");
});

test("BuyerReg can catch error in data", async () => {
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
    address: "123 Main St",
  };

  await expect(BuyerReg.register(data)).rejects.toThrow(
    "phoneNumber is required"
  );
});

test("BuyerReg can catch error in data", async () => {
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
    phoneNumber: "1234567890",
  };

  await expect(BuyerReg.register(data)).rejects.toThrow("address is required");
});

test("BuyerReg dont take invalid field", async () => {
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
    phoneNumber: "1234567890",
    address: "123 Main St",
    invalidField: "invalidValue",
  };
  await expect(BuyerReg.register(data)).rejects.toThrow("Unexpected fields");
});
