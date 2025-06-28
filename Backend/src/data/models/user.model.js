import mongose from "mongoose";
import { Roles } from "./role.enum.js";

const userSchema = new mongose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: Roles,
    },
  },
  {
    timestamps: true,
  }
);

export default mongose.model("User", userSchema);
