import BaseRepository from "./base.repository.js";
import Order from "../models/order.model.js";

class OrderRepository extends BaseRepository {
  constructor() {
    super(Order);
  }

  async findByBuyer(buyerId) {
    return this.model.find({ buyerId }).sort({ createdAt: -1 }).limit(10);
  }

  async findBySeller(sellerId) {
    return this.model.find({ sellerId }).sort({ createdAt: -1 }).limit(10);
  }

  async findById(orderId) {
    return this.model.findById(orderId);
  }
}

export default new OrderRepository();
