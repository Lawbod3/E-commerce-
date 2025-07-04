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
import Login from "../../../services/userService/login.userService.js";
import User from "../../../data/models/user.model.js";
dotenv.config();

const userData = {
  email: "bode@example.com",
  password: "testPassword",
  role: "admin",
};

const loginData = {
  email: "bode@example.com",
  password: "testPassword",
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

test("User can login successfully", async () => {
  const uniqueEmail = `test_${Date.now()}_${Math.floor(
    Math.random() * 1e5
  )}@example.com`;
  const registerData = {
    email: uniqueEmail,
    password: "testPassword",
    role: "admin",
  };

  const loginData = {
    email: uniqueEmail,
    password: "testPassword",
  };

  await Register.user(registerData);
  const user = await Login.user(loginData);
  expect(user).toBeTruthy();
});

test("Login can catch error in the data", async () => {
  await Register.user(userData);
  const loginData = { email: "wrong@example.com", password: "testPassword" };
  await expect(Login.user(loginData)).rejects.toThrow("User not found");
});

test("Login can catch error in the data", async () => {
  await Register.user(userData);
  const loginData = { email: "bode@example.com", password: "wrongPassword" };
  await expect(Login.user(loginData)).rejects.toThrow("Invalid password");
});

test("Login can catch error in the data", async () => {
  await Register.user(userData);
  const loginData = { email: "bode@example.com" };
  await expect(Login.user(loginData)).rejects.toThrow("Password is required");
});

test("Login can catch Unexpected field error", async () => {
  await Register.user(userData);
  const loginData = {
    email: "bode@example.com",
    password: "testPassword",
    unexpectedField: "unexpected",
  };
  await expect(Login.user(loginData)).rejects.toThrow("Unexpected fields");
});
