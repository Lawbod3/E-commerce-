import mongoose from "mongoose";

const buyerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Buyer", buyerSchema);
