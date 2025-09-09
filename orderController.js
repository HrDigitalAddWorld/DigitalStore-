const  Cart = require("../models/cartModel");
const  Order = require("../models/orderModel");
const sendNotification = require("../config/notification");
const User = require("../models/userModel");

const getMerchantOrders = async (req, res) => {
  try {
    const sellerId = req.user.id; // seller ID from JWT
    console.log("Seller ID:", sellerId);

    const orders = await Order.find()
      .populate({
        path: "items.product",
        match: { seller: sellerId }, // only seller's products
        populate: { path: "seller", select: "name email" },
      })
      .populate("user", "name email");

    // filter out empty items
    const sellerOrders = orders
      .map(order => {
        const filteredItems = order.items.filter(item => item.product !== null);
        return filteredItems.length > 0 ? { ...order._doc, items: filteredItems } : null;
      })
      .filter(order => order !== null);

    res.json(sellerOrders);
    console.log("Seller Orders:", sellerOrders);
  } catch (error) {
    console.error("Error fetching seller orders:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const changeOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { orderStatus } = req.body;

    if (!["Pending", "Shipped", "Delivered", "Cancelled"].includes(orderStatus)) {
      return res.status(400).json({ message: "Invalid order status" });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.orderStatus = orderStatus;
    await order.save();

    res.json({ message: "Order status updated successfully", order });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};






const checkout = async (req, res) => {
  try {
    const { shippingAddress, paymentMethod, transactionId } = req.body;
    const userId = req.user.id;  // ✅ from token
    console.log("🔑 Checkout started for userId:", userId);

    // Check payment method
    if (!["Wallet", "PhonePe", "Paytm", "GooglePay", "upi", "Razorpay"].includes(paymentMethod)) {
      console.log("❌ Invalid payment method:", paymentMethod);
      return res.status(400).json({ success: false, message: "Invalid payment method" });
    }

    // Check transaction ID
    if (!transactionId) {
      console.log("❌ Missing transactionId");
      return res.status(400).json({ success: false, message: "Transaction ID is required" });
    }

    // Fetch cart
    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    console.log("🛒 Cart found:", cart ? "YES" : "NO");

    if (cart) {
      console.log("📦 Cart Items:", cart.items);
      console.log("📦 Items Count:", cart.items.length);
    }

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }

    // Calculate total
    const totalPrice = cart.items.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
    console.log("💰 Total Price:", totalPrice);

    // Create order
    const order = new Order({
      user: userId,
      items: cart.items,
      totalPrice,
      shippingAddress,
      paymentMethod,
      transactionId,
      paymentStatus: "Paid",
      orderStatus: "Pending",
    });

    await order.save();
    console.log("✅ Order saved:", order._id);

    await Cart.deleteOne({ user: userId });
    console.log("🗑️ Cart deleted for user:", userId);

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error("🔥 Checkout Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;

        if (!["Pending", "Shipped", "Delivered", "Cancelled"].includes(status)) {
            return res.status(400).json({ success: false, message: "Invalid status" });
        }

        const order = await Order.findById(orderId).populate("user", "email");
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        order.orderStatus = status;
        await order.save();

        sendNotification(order.user.email, `Your order status has been updated to ${status}`);

        res.status(200).json({ success: true, message: "Order status updated", order });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const trackOrder = async (req, res) => {
    try {
        const { orderId } = req.params;

        const order = await Order.findById(orderId).populate("items.product");
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        res.status(200).json({
            success: true,
            orderStatus: order.orderStatus,
            paymentStatus: order.paymentStatus,
            estimatedDelivery: order.orderStatus === "Shipped" ? "3-5 Business Days" : "TBD",
            transactionId: order.transactionId,
            order
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate("user", "email").populate("items.product");
        res.status(200).json({ success: true, orders });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getOrderDetails = async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await Order.findById(orderId).populate("user", "email").populate("items.product");

        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        res.status(200).json({ success: true, order });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};



module.exports = { checkout, updateOrderStatus, trackOrder, getAllOrders, getOrderDetails, getMerchantOrders,changeOrderStatus };