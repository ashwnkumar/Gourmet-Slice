// models/Order.js
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assuming you have a User model
      required: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product", // Assuming you have a Product model
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    address: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["Cash on Delivery", "Credit Card", "Stripe"],
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "Pending", // Or other statuses like "Completed", "Cancelled", etc.
    },
  },
  {
    timestamps: true, // This will add createdAt and updatedAt fields
  }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
