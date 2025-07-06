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
import CreateProduct from "../../../services/productService/createProduct.productService.js";
import Product from "../../../data/models/product.model.js";
import Seller from "../../../data/models/seller.model.js";
import SellerReg from "../../../services/sellerService/createProfile.sellerService.js";
import AddToCart from "../../../services/cartService/addToCart.cartService.js";

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
  await Product.deleteMany({});
  await Seller.deleteMany({});
  
});

test("buyer cann add to the cart ", async () => {
  const userSellerData = {
    email: `test_${Date.now()}@example.com`,
    password: "testpassword",
    role: "admin",
  };
  const userSeller = await Register.user(userSellerData);
  const sellerData = {
    userId: userSeller._id,
    firstname: "seller",
    lastname: "Doe",
    company: "Test Company",
    address: "123 Main St",
    phoneNumber: "1234567856890",
  };
  const seller = await SellerReg.register(sellerData);
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

  const cart = await CreateCart.create(buyer._id);
  expect(cart).toBeTruthy();

  const buyerCart = await AddToCart.buyerCart(buyer._id, product._id);
  expect(buyerCart).toBeTruthy();
  expect(buyerCart.products.length).toBe(1);

  const productData2 = {
    quantity: 10,
    description: "This is a test product",
    price: 9.99,
    sellerId: seller._id,
    category: "ELECTRONICS",
    name: "Test Product2",
  };

  const product2 = await CreateProduct.create(productData2);
  expect(product2).toBeTruthy();

  const buyerCart2 = await AddToCart.buyerCart(buyer._id, product2._id);
  expect(buyerCart2).toBeTruthy();
  expect(buyerCart2.products.length).toBe(2);
});
