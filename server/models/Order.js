const mongoose = require("mongoose");

// Order collection schema
const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    addressId: {
      type: mongoose.Schema.ObjectId,
      ref: "Address",
      required: true,
    },
    totalPrice: { type: Number, required: true },
    products: [
      {
        productId: {
          type: mongoose.Schema.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
