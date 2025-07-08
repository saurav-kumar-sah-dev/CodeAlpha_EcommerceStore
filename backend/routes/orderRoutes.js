const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const Order = require("../models/Order");

// ✅ Place Order
router.post("/", protect, async (req, res) => {
  const { products } = req.body;
  try {
    const newOrder = await Order.create({
      user: req.user._id,
      products
    });
    res.status(201).json({ message: "✅ Order placed", order: newOrder });
  } catch (err) {
    res.status(500).json({ message: "❌ Failed to place order" });
  }
});

// ✅ Get My Orders
router.get("/my", protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("products.productId", "name") // Get product name
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "❌ Failed to fetch orders" });
  }
});

module.exports = router;
