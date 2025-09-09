const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Customer = require("../models/customerModel");
const Seller = require("../models/SellerPanelModule/sellerModel");
const SuperAdmin = require("../models/AdminPanelModule/registerModel");
const { sendOtpEmail } = require("../config/email");
const moment = require("moment");
const crypto = require("crypto");
const validator = require("validator");  // Added for email validation

dotenv.config();

// Generate a 4-digit OTP
const generateOTP = () => Math.floor(1000 + Math.random() * 9000); // Generates a 4-digit OTP

const registerCustomer = async (req, res) => {
  try {
    const { name, mobile, email, password } = req.body;

    if (!name || !mobile || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email format." });
    }

    if (!validator.isMobilePhone(mobile)) {
      return res.status(400).json({ message: "Invalid mobile number." });
    }

    const existingCustomer = await Customer.findOne({ email });
    const existingSeller = await Seller.findOne({ businessEmail: email });
    const existingSuperAdmin = await SuperAdmin.findOne({ email });

    // Email already used by a verified user in any role
    if (
      (existingCustomer && existingCustomer.isVerified) ||
      existingSeller ||
      existingSuperAdmin
    ) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    const otp = generateOTP();
    const hashedPassword = await bcrypt.hash(password, 10);

    // If customer exists but is not verified — resend OTP
    if (existingCustomer && !existingCustomer.isVerified) {
      existingCustomer.name = name;
      existingCustomer.mobile = mobile;
      existingCustomer.password = hashedPassword;
      existingCustomer.otp = otp;
      existingCustomer.otpCreatedAt = Date.now();
      await existingCustomer.save();

      try {
        await sendOtpEmail(email, "Your OTP Code", otp, "customerRegistration");
        console.log("OTP sent again to:", email);
        return res
          .status(200)
          .json({ message: "OTP sent again. Verify to complete registration." });
      } catch (emailErr) {
        return res.status(500).json({ message: "Failed to send OTP email.", error: emailErr.message });
      }
    }

    const newCustomer = new Customer({
      name,
      mobile,
      email,
      password: hashedPassword,
      otp,
      otpCreatedAt: Date.now(),
    });

    await newCustomer.save();

    try {
      await sendOtpEmail(email, "Your OTP Code", otp, "customerRegistration");
      console.log("OTP sent to:", email);
      return res
        .status(200)
        .json({ message: "OTP sent to email. Verify to complete registration." });
    } catch (emailErr) {
      return res.status(500).json({ message: "Failed to send OTP email.", error: emailErr.message });
    }

  } catch (err) {
    console.error("Error in registerCustomer:", err);
    res.status(500).json({ message: "Server error.", error: err.message });
  }
};


const verifyCustomerOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const customer = await Customer.findOne({ email });
    console.log(customer.email, email); // Debugging log

    if (!customer) return res.status(400).json({ message: "Customer not found." });

    if (customer.isVerified) return res.status(400).json({ message: "Customer already verified." });
    if (!customer.otp || otp !== customer.otp) return res.status(400).json({ message: "Invalid OTP." });

    // Check OTP expiration (2 minutes)
    if (moment().isAfter(moment(customer.otpCreatedAt).add(2, "minutes"))) {
      return res.status(400).json({ message: "OTP has expired. Please request a new one." });
    }

    // Mark customer as verified
    customer.isVerified = true;
    customer.otp = null; // Clear OTP after verification
    customer.otpCreatedAt = null; // Clear OTP creation time
    await customer.save();

    res.status(200).json({ message: "Customer verified successfully." });
  } catch (err) {
    res.status(500).json({ message: "Server error.", error: err.message });
  }
};

const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id).populate("orders").populate("paymentHistory");
    if (!customer) return res.status(404).json({ message: "Customer not found." });
    res.status(200).json(customer);
  } catch (err) {
    res.status(500).json({ message: "Server error.", error: err.message });
  }
};

const updateCustomer = async (req, res) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCustomer) return res.status(404).json({ message: "Customer not found." });
    res.status(200).json({ message: "Customer updated successfully", updatedCustomer });
  } catch (err) {
    res.status(500).json({ message: "Server error.", error: err.message });
  }
};

const deleteCustomer = async (req, res) => {
  try {
    const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
    if (!deletedCustomer) return res.status(404).json({ message: "Customer not found." });
    res.status(200).json({ message: "Customer deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: "Server error.", error: err.message });
  }
};

module.exports = {
  registerCustomer,
  verifyCustomerOtp,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};