const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Seller = require('./src/models/SellerPanelModule/sellerModel');
const Product = require('./src/models/productModel');
const Order = require('./src/models/orderModel');
const Cart = require('./src/models/cartModel');
const Customer = require('./src/models/customerModel');
const Slider = require("./src/models/AdminPanelModule/slide");
const Admin = require('./src/models/AdminPanelModule/registerModel');


const bcrypt = require('bcryptjs');
dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected for seeding');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  }
};

// Seed Data
const seedData = async () => {
  try {
    // Clear existing data
    await Seller.deleteMany();
    await Customer.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();
    await Cart.deleteMany();
    await Slider.deleteMany();
await Admin.deleteMany(); // clean admin collection


const hashedAdminPassword = await bcrypt.hash("admin123", 10);
await Admin.create({
  email: "admin@example.com",
  password: hashedAdminPassword,
  role: "admin"
});

    const hashedSellerPassword = await bcrypt.hash("seller123", 10);

const sellers = await Seller.insertMany([
  {
    businessName: 'Ashish Store',
    businessType: 'sole_proprietorship',
    registrationNumber: 'REG123456',
    businessEmail: 'ashish@seller.com',
    businessPhone: '9999999999',
    gstNumber: '27AAAPL1234C1ZV',
    panCardNumber: 'AAAPL1234C',
    bankDetails: {
      bankName: 'HDFC Bank',
      accountNumber: '1234567890',
      ifscCode: 'HDFC0001234',
    },
    address: {
      registeredAddress: '123 Main Street',
      city: 'Mumbai',
      district: 'Mumbai Suburban',
      state: 'Maharashtra',
      pinCode: '400001',
    },
    productCategories: ['Electronics', 'Accessories'],
    shippingMethod: 'Courier',
    termsConditions: true,
    sellerAgreement: true,
    dataPrivacyConsent: true,
    password: hashedSellerPassword,
    approved: true,
    isVerified: true,
    role: 'seller',
  },
]);


   await Slider.insertMany([
  {
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    title: "Welcome to Our Store",
    description: "Explore the best products curated just for you.",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    title: "Mega Discounts",
    description: "Up to 70% off on selected items. Hurry now!",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    title: "New Arrivals",
    description: "Check out the latest trends in our collection.",
  },
]);


    // Insert Dummy Customers

    const hashedPassword = await bcrypt.hash("123456", 10);
    await Customer.create({
      name: "subhash",

      email: "subhash@example.com",
      mobile: "9876543211",
      password: hashedPassword,
    });
    const customers = await Customer.insertMany([
      {
        name: 'John Doe',
        email: 'john@example.com',
        mobile: '1234567890',
        password: 'hashedpassword',
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        mobile: '9876543210',
        password: 'hashedpassword',
      },
    ]);

    // Insert Dummy Products
    const products = await Product.insertMany([
      {
        name: 'Smartphone',
        price: 14999,
        description: 'A high-quality smartphone with great features.',
        category: 'Electronics',
        stock: 50,
        seller: sellers[0]._id,
      },
      {
        name: 'Bluetooth Headphones',
        price: 2999,
        description: 'Noise-cancelling, wireless headphones.',
        category: 'Accessories',
        stock: 100,
        seller: sellers[0]._id,
      },
    ]);

    await Order.insertMany([
      {
        user: customers[0]._id,
        items: [
          {
            product: products[0]._id,
            quantity: 1,
          },
        ],
        totalPrice: products[0].price,
        shippingAddress: {
          address: '123 Main St',
          city: 'Mumbai',
          postalCode: '400001',
          country: 'India',
        },
        paymentMethod: 'PhonePe', // ✅ MUST be one of: Wallet, PhonePe, Paytm, Google Pay, Razorpay
        paymentStatus: 'Pending',
        orderStatus: 'Pending',
        transactionId: 'txn_test_1234567890',
      },
    ]);
    await Cart.insertMany([
      {
        user: customers[1]._id, // ✅ Corrected field name
        products: [
          {
            product: products[1]._id,
            quantity: 2,
          },
        ],
      },
    ]);


    console.log('🎉 Dummy data inserted successfully!');
    process.exit();
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

connectDB().then(seedData);
