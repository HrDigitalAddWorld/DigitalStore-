const jwt = require('jsonwebtoken');
const Admin = require('../models/AdminPanelModule/registerModel');
const Seller = require('../models/SellerPanelModule/sellerModel');
const Customer = require('../models/customerModel');
const User = require("../models/userModel");


const roleAuthorization = (roles) => {
  return async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
      }

      const token = authHeader.split(" ")[1];
      
      if (!token) {
        return res.status(401).json({ message: "Unauthorized: Token missing" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      let user;
      
      if (decoded.role === "admin") {
        user = await Admin.findById(decoded.id);
      } else if (decoded.role === "seller") {
        user = await Seller.findById(decoded.id);
      } else if (decoded.role === "customer") {
        user = await Customer.findById(decoded.id);
      }
      console.log("Decoded Token:", decoded);

      if (!user) {
        return res.status(404).json({ message: "User not founds" });
        
      }

      if (!roles.includes(decoded.role)) {
        return res.status(403).json({ message: "Forbidden: Insufficient permissions" });
      }

      req.user = { id: user._id, role: decoded.role };
      //console.log(roles,"iii");
      next();
    } catch (error) {
     
      console.error("JWT Verification Error:", error);
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
  };
};

const checkAlreadyLoggedIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return next();

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    let user;

    switch (decoded.role) {
      case 'admin':
        user = await Admin.findById(decoded.userId);
        break;
      case 'seller':
        user = await Seller.findById(decoded.userId);
        break;
      case 'customer':
        user = await Customer.findById(decoded.userId);
        break;
    }

    if (user) {
      return res.status(403).json({ success: false, message: 'You are already logged in' });
    }

    next();
  } catch (error) {
    next();
  }
};

module.exports = { roleAuthorization, checkAlreadyLoggedIn };