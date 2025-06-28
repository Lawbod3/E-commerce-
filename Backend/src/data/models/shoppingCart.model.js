import mongoose from "mongoose";

const shoppingCartSchema = new mongoose.Schema({
  buyerId: { type: mongoose.Schema.Types.ObjectId, ref: "Buyer" },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, default: 1 },
    },
  ],
  createdDate: { type: Date, default: Date.now },
});

export default mongoose.model("ShoppingCart", shoppingCartSchema);
