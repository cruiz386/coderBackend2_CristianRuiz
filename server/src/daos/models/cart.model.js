import { Schema, model } from "mongoose";

const CartSchema = new Schema({

  user_id: { type: Schema.Types.ObjectId, ref: "users" }, 

  products: [
    {

      product: { type: Schema.Types.ObjectId, ref: "products" },
      quantity: { type: Number, required: true, default: 1 },
    },
  ],

});

export const CartModel = model("carts", CartSchema);