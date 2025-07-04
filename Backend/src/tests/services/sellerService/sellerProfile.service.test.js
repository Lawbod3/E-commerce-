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
import SellerProfile from "../../../services/sellerService/getProfile.sellerService.js";
import SellerReg from "../../../services/sellerService/createProfile.sellerService.js";
import Seller from "../../../data/models/seller.model.js";
import User from "../../../data/models/user.model.js";
import Register from "../../../services/userService/Register.userService.js";
import UpdateSeller from "../../../services/sellerService/updateProfile.sellerService.js";

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

test("that Seller can get profile", async () => {
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

  const profile = await SellerProfile.getProfile(user._id);
  expect(profile).toBeTruthy();

  const updatedData = {
    phoneNumber: "1234566787890",
  };

  const updatedSeller = await UpdateSeller.profile(user._id, updatedData);
  expect(updatedSeller).toBeTruthy();
});
