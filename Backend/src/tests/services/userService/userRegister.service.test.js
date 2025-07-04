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

import Register from "../../../services/userService/Register.userService.js";
import User from "../../../data/models/user.model.js";
dotenv.config();

const userData = {
  email: "bode@example.com",
  password: "testPassword",
  role: "admin",
};

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
});

afterEach(async () => {
  await User.deleteMany({});
});

test("UserService", async () => {
  const user = await Register.user({
    email: `test_${Date.now()}@example.com`,
    password: "testPassword",
    role: "admin",
  });
  expect(user).toBeTruthy();
});

test("UserService can catch error in the data", async () => {
  const data = { password: "testPassword", role: "admin" };
  await expect(Register.user(data)).rejects.toThrow("Email is required");
});

test("UserService can catch error in the data", async () => {
  const data = { email: "bode@example.com", role: "admin" };
  await expect(Register.user(data)).rejects.toThrow("Password is required");
});

test("UserService can catch error in the data", async () => {
  const data = { email: "bode@example.com", password: "123456", role: "admin" };
  await expect(Register.user(data)).rejects.toThrow(
    "Password lenghth should be at least 7 characters"
  );
});

test("UserService can catch error in the data", async () => {
  const uniqueUser = {
    email: "unique_" + Date.now() + "@example.com",
    password: "testPassword",
    role: "admin",
  };
  await Register.user(uniqueUser);
  await expect(Register.user(uniqueUser)).rejects.toThrow(
    "User already exists"
  );
});

test("UserService can catch unexpected field error", async () => {
  const data = {
    email: "bode@example.com",
    password: "testPassword",
    role: "admin",
    unexpectedField: "unexpected",
  };
  await expect(Register.user(data)).rejects.toThrow("Unexpected fields");
});
