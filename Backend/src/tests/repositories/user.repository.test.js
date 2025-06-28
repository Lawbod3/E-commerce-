import { describe, it, beforeAll, afterAll, expect, beforeEach } from "vitest";
import UserRepository from "../../data/repository/user.repository.js";
import User from "../../data/models/user.model.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const userRepo = UserRepository;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
});

beforeEach(async () => {
  await User.deleteMany({});
  await userRepo.create({
    email: "test@example.com",
    password: "testPassword",
    role: "buyer",
  });
});

describe("UserRepository", () => {
  it("should create a user", async () => {
    const user = await userRepo.findByEmail("test@example.com");
    expect(user).toBeDefined();
    expect(user.email).toBe("test@example.com");
  });

  it("should find user by email", async () => {
    const user = await userRepo.findByEmail("test@example.com");
    expect(user).not.toBeNull();
    expect(user.role).toBe("buyer");
  });

  it("should find user and ban", async () => {
    const user = await userRepo.findByEmail("test@example.com");
    expect(user).not.toBeNull();
    expect(user.role).toBe("buyer");
    const bannedUser = await userRepo.banUser(user._id, { banned: true });
    expect(bannedUser.banned).toBe(true);
  });
});
