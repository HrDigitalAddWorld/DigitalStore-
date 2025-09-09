const Cart = require("../models/cartModel");

// Add to cart
const addToCart = async (req, res) => {
    try {
        const userId = req.user.id; // from token
        const { productId, quantity } = req.body;

        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            cart = new Cart({ user: userId, items: [] });
        }

        // Check if product already exists in cart
        const existingItem = cart.items.find(item => item.product.toString() === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({ product: productId, quantity });
        }

        await cart.save();
        res.status(200).json({ success: true, cart });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get cart
const getCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const cart = await Cart.findOne({ user: userId }).populate("items.product");
        res.status(200).json({ success: true, cart: cart || { items: [] } });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update cart item
const updateCartItem = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.params;
        const { quantity } = req.body;

        let cart = await Cart.findOne({ user: userId });
        if (!cart) return res.status(404).json({ success: false, message: "Cart not found" });

        const item = cart.items.find(item => item.product.toString() === productId);
        if (!item) return res.status(404).json({ success: false, message: "Item not found in cart" });

        item.quantity = quantity;
        await cart.save();

        res.status(200).json({ success: true, cart });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Remove cart item
const removeCartItem = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.params;

        let cart = await Cart.findOne({ user: userId });
        if (!cart) return res.status(404).json({ success: false, message: "Cart not found" });

        cart.items = cart.items.filter(item => item.product.toString() !== productId);
        await cart.save();

        res.status(200).json({ success: true, cart });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Clear cart
const clearCart = async (req, res) => {
    try {
        const userId = req.user.id;

        let cart = await Cart.findOne({ user: userId });
        if (!cart) return res.status(404).json({ success: false, message: "Cart not found" });

        cart.items = [];
        await cart.save();

        res.status(200).json({ success: true, message: "Cart cleared", cart });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { addToCart, getCart, updateCartItem, removeCartItem, clearCart };
