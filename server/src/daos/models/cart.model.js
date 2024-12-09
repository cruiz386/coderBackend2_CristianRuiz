
import { Schema, model } from "mongoose";

const CartSchema = new Schema({
  products: [
    {
      productId: { type: Schema.Types.ObjectId, ref: "products", required: true },
      quantity: { type: Number, default: 1 },
    },
  ],
});

export const CartModel = model("carts", CartSchema);
