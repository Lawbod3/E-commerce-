import mongoose from "mongoose";
import { Categories } from "./category.enum.js";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    description: { type: String, required: true },
    price: Number,
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "Seller" },
    category: { type: String, enum: Categories, required: true },
    postedDate: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ["AVAILABLE", "UNAVAILABLE"],
      default: "AVAILABLE",
    },
    image: String,
    banned: { type: Boolean, default: false },
    delete: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
