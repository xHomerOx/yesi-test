// import mongoose from "mongoose";

// const cartCollection = "Carts";

// const cartSchema = new mongoose.Schema({
//   products: {
//     type: [
//       {
//         product: {
//           type: mongoose.Schema.ObjectId,
//           ref: "products",
//         },
//         quantity: {
//           type: Number,
//         },
//       },
//     ],
//     default: [],
//   },
// });

// export const cartModel = mongoose.model(cartCollection, cartSchema);

import mongoose from "mongoose";

const { Schema } = mongoose;

const cartSchema = new Schema({
  products: [
    {
      product: { type: Schema.Types.ObjectId, ref: "products" },
      quantity: { type: Number, default: [] },
    },
  ],
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
