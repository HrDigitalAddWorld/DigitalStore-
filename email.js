/* const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendOtpEmail = async (email, subject, otp, type) => {
  try {
    const messages = {
      sellerRegistration: `<p>Hello,</p><p>To complete your registration, use this OTP:</p><h3 style='color: #4CAF50;'>${otp}</h3><p>This OTP is valid for 5 minutes.</p>`,
      resetPassword: `<p>Hello,</p><p>Use this OTP to reset your password:</p><h3 style='color: #FF6347;'>${otp}</h3><p>This OTP is valid for 5 minutes.</p>`,
    };

    await transporter.sendMail({
      from: `"Digital Store" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: subject || "Your OTP Code",
      html: messages[type] || `<p>Your OTP Code: <strong>${otp}</strong> (Valid for 5 min)</p>`,
    });

    if (process.env.NODE_ENV === "development") {
      console.log(`OTP sent to ${email}`);
    }
  } catch (error) {
    console.error("Error sending OTP email:", error);
  }
};

module.exports = { sendOtpEmail };*/

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendOtpEmail = async (email, subject, otp, type) => {
  try {
    const fromEmail = `"Digital Store" <${process.env.EMAIL_USER}>`;
    

    console.log("Sending OTP from:", fromEmail); // ✅ Log the FROM email
    console.log("Sending OTP to:", email);       // ✅ Log the TO email

    const messages = {
      sellerRegistration: `<p>Hello,</p><p>To complete your registration, use this OTP:</p><h3 style='color: #4CAF50;'>${otp}</h3><p>This OTP is valid for 5 minutes.</p>`,
      resetPassword: `<p>Hello,</p><p>Use this OTP to reset your password:</p><h3 style='color: #FF6347;'>${otp}</h3><p>This OTP is valid for 5 minutes.</p>`,
    };

    await transporter.sendMail({
      from: fromEmail,
      to: email,
      subject: subject || "Your OTP Code",
      html: messages[type] || `<p>Your OTP Code: <strong>${otp}</strong> (Valid for 5 min)</p>`,
    });

    if (process.env.NODE_ENV === "development") {
      console.log(`OTP sent to ${email}`);
    }
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw error;
  }
};

module.exports = { sendOtpEmail };
