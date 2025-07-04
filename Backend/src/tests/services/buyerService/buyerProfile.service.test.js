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
import BuyerProfile from "../../../services/buyerService/profile.buyerService.js";
import BuyerReg from "../../../services/buyerService/register.buyerService.js";
import Buyer from "../../../data/models/buyer.model.js";
import User from "../../../data/models/user.model.js";
import Register from "../../../services/userService/Register.userService.js";
import UpdateBuyer from "../../../services/buyerService/updateProfile.buyerService.js";

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

test("that buyer can get profile", async () => {
  const userData = {
    email: `test_${Date.now()}_${Math.floor(Math.random() * 1e5)}@example.com`,
    password: "testPassword",
    role: "admin",
  };

  const user = await Register.user(userData);

  const data = {
    userId: user._id,
    firstname: "John",
    lastname: "Doe",
    phoneNumber: "12345679908901",
    address: "123 Main St",
  };

  const buyer = await BuyerReg.register(data);
  expect(buyer).toBeTruthy();

  const profile = await BuyerProfile.getProfile(user._id);
  expect(profile).toBeTruthy();

  const updatedData = {
    phoneNumber: "1234567890",
  };

  const updatedBuyer = await UpdateBuyer.profile(user._id, updatedData);
  expect(updatedBuyer).toBeTruthy();
});
