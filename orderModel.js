const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true },
      },
    ],
    totalPrice: { type: Number, required: true },
    shippingAddress: { type: Object, required: true },
    paymentMethod: { type: String, required: true, enum: ["Wallet", "PhonePe", "Paytm", "Google Pay","upi", "Razorpay"] },
    paymentStatus: { type: String, default: "Pending", enum: ["Pending", "Paid", "Failed"] },
    orderStatus: { type: String, default: "Pending", enum: ["Pending", "Shipped", "Delivered", "Cancelled"] },
    transactionId: { type: String, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
