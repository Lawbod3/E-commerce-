import BaseRepository from "./base.repository.js";
import Order from "../models/order.model.js";

class OrderRepository extends BaseRepository {
  constructor() {
    super(Order);
  }

  async findByBuyerId(buyerId) {
    return await this.model.find({ buyerId }).sort({ createdAt: -1 }).limit(10);
  }

  async findBySellerId(sellerId) {
    return await this.model.find({ sellerId }).sort({ createdAt: -1 }).limit(10);
  }

  async findById(orderId) {
    return await this.model.findById(orderId);
  }
}

export default new OrderRepository();
