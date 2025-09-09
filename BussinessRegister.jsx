import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../common/Header";
import Footer from "../common/Footer";
import { useNavigate } from "react-router-dom";
import { color } from "framer-motion";

const SellerRegistration = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: "",
    businessType: "",
    registrationNumber: "",
    businessEmail: "",
    businessPhone: "",
    alternatePhone: "",
    businessWebsite: "",
    gstNumber: "",
    panCardNumber: "",
    bankDetails: { bankName: "", accountNumber: "", ifscCode: "" },
    address: { registeredAddress: "", city: "", district: "", state: "", pinCode: "", country: "India" },
    productCategories: [],
    shippingMethod: "",
    termsConditions: false,
    sellerAgreement: false,
    dataPrivacyConsent: false,
    password: "",
    confirmPassword: "",
    otp: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const categories = ["Grocery", "Electronics", "Fashion", "Books", "Others"];
  const shippingMethods = ["Self", "Third Party", "Both"];

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      if (name === "productCategories") {
        setFormData((prev) => ({
          ...prev,
          productCategories: checked
            ? [...prev.productCategories, value]
            : prev.productCategories.filter((cat) => cat !== value),
        }));
      } else {
        setFormData((prev) => ({ ...prev, [name]: checked }));
      }
    } else if (["bankName", "accountNumber", "ifscCode"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        bankDetails: { ...prev.bankDetails, [name]: value },
      }));
    } else if (["registeredAddress", "city", "district", "state", "pinCode"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [name]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    if (!formData.businessEmail) return "Business email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.businessEmail)) return "Invalid email format.";
    if (!/^\d{10}$/.test(formData.businessPhone)) return "Enter a valid 10-digit phone number.";
    if (formData.password !== formData.confirmPassword) return "Passwords do not match!";
    return null;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("/api/seller/register", formData);
      alert(response.data.message);
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!formData.otp) {
      setError("Please enter OTP");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("/api/seller/verify-otp", formData);
      alert(response.data.message);
      setStep(3);
    } catch (err) {
      setError(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLoginRedirect = () => {
    navigate("/login"); // Redirect to login page
  };

  return (
    <>
      <Header />
      <div className="d-flex justify-content-center align-items-center vh-100">
        
          <div style={{ position: "relative" }}>
    {(step === 1 || step === 2) && (
      <button
        className="login-button"
        onClick={handleLoginRedirect}
        style={{
          position: "absolute",
          top: "-350px",
          right: "-800px",
          padding: "6px 12px",
          fontSize: "20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          zIndex: 10,
        }}
      >
        Login
      </button>
    )}
        </div>
        <div className="card shadow-lg w-100" style={{ maxWidth: "600px" }}>
          <div className="card-body">
            <h2 className="text-center mb-4">Seller Registration</h2>

            {error && <div className="alert alert-danger">{error}</div>}

            {step === 1 && (
              <form onSubmit={handleRegister} noValidate>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Business Name</label>
                    <input className="form-control" name="businessName" value={formData.businessName} onChange={handleChange} required />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Business Type</label>
                    <input className="form-control" name="businessType" value={formData.businessType} onChange={handleChange} required />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Registration Number</label>
                    <input className="form-control" name="registrationNumber" value={formData.registrationNumber} onChange={handleChange} />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Business Email</label>
                    <input type="email" className="form-control" name="businessEmail" value={formData.businessEmail} onChange={handleChange} required />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Business Phone</label>
                    <input className="form-control" name="businessPhone" value={formData.businessPhone} onChange={handleChange} required />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Alternate Phone</label>
                    <input className="form-control" name="alternatePhone" value={formData.alternatePhone} onChange={handleChange} />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Business Website</label>
                    <input className="form-control" name="businessWebsite" value={formData.businessWebsite} onChange={handleChange} />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">GST Number</label>
                    <input className="form-control" name="gstNumber" value={formData.gstNumber} onChange={handleChange} />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">PAN Card Number</label>
                    <input className="form-control" name="panCardNumber" value={formData.panCardNumber} onChange={handleChange} />
                  </div>
                </div>

                <div className="d-grid mt-3">
                  <button className="btn btn-primary" type="submit" disabled={loading}>
                    {loading ? "Registering..." : "Register"}
                  </button>
                </div>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleVerifyOtp}>
                <div className="mb-3">
                  <label className="form-label">Enter OTP</label>
                  <input className="form-control" type="text" name="otp" value={formData.otp} onChange={handleChange} required />
                </div>
                <div className="d-grid">
                  <button className="btn btn-success" type="submit" disabled={loading}>
                    {loading ? "Verifying OTP..." : "Verify OTP"}
                  </button>
                </div>
              </form>
            )}


          </div>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default SellerRegistration;