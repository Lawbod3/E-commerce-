import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
    paid: { type: Boolean, default: false },
    total: Number,
    detail: String,
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);
