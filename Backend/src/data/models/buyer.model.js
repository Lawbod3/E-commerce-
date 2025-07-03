import mongoose from "mongoose";
import { Roles } from "./role.enum.js";

const buyerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    phoneNumber: { type: String, required: true, unique: true },
    address: String,
    role: {
      type: String,
      required: true,
      enum: Roles,
      default: "buyer",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Buyer", buyerSchema);
