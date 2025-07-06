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
import CreateCart from "../../../services/cartService/createCart.cartService.js";
import ShoppingCart from "../../../data/models/shoppingCart.model.js";
import Buyer from "../../../data/models/buyer.model.js";
import User from "../../../data/models/user.model.js";
import Register from "../../../services/userService/Register.userService.js";
import BuyerReg from "../../../services/buyerService/register.buyerService.js";

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
  await ShoppingCart.deleteMany({});
});

test("Create cart service", async () => {
  const userData = {
    email: "unique_" + Date.now() + "@example.com",
    password: "testpassword",
    role: "buyer",
  };
  const user = await Register.user(userData);
  const data = {
    userId: user._id,
    firstname: "John",
    lastname: "Doe",
    address: "123 Main St",
    phoneNumber: "1234567890",
  };

  const buyer = await BuyerReg.register(data);
  expect(buyer).toBeTruthy();

  const cart = await CreateCart.create(user._id);
  expect(cart).toBeTruthy();
});
