import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    houseNumber: Number,
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
  },
  { timestamps: true }
);

export default mongoose.model("Address", addressSchema);
