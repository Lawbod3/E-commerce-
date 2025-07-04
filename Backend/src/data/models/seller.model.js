import mongoose from "mongoose";
import { Roles } from "./role.enum.js";

const sellerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  companyName: String,
  address: String,
  role: {
    type: String,
    required: true,
    enum: Roles,
    default: "seller",
  },
});

export default mongoose.model("Seller", sellerSchema);
