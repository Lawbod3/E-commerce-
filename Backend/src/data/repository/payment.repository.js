import BaseRepository from "./base.repository.js";
import Payment from "../../models/payment.model.js";

class PaymentRepository extends BaseRepository {
  constructor() {
    super(Payment);
  }

  async findByOrderId(orderId) {
    return await this.model.findOne({ orderId });
  }
}

export default new PaymentRepository();
