import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    buyerId: { type: mongoose.Schema.Types.ObjectId, ref: "Buyer" },
    sellerIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Seller" }],
    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: Number,
      },
    ],
    totalAmount: Number,
    orderDate: { type: Date, default: Date.now },
    deliveryDate: Date,
    orderStatus: {
      type: String,
      enum: ["PENDING", "SHIPPED", "DELIVERED", "CANCELLED"],
      default: "PENDING",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
