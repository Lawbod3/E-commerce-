import mongoose from "mongoose";
import { Categories } from "./category.enum.js";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    quantity: Number,
    description: String,
    price: Number,
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "Seller" },
    category: { type: String, enum: Categories, required: true },
    postedDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
