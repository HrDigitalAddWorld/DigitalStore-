import React, { useEffect, useState } from "react";
import axios from "axios";
import LeftSideBar from "./Partials/LeftSideBar";
import SellerHeader from "./Partials/SellerHeader";
import SellerHead from "./Partials/SellerHead";

const ProfileManage = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    storeName: "",
    storeLogo: null,
    bankAccount: "",
    upiId: "",
    paypalId: "",
    socialLinks: { facebook: "", instagram: "", twitter: "" },
    password: ""
  });

  const fetchProfile = async () => {
    try {
      const id = localStorage.getItem("sellerId");
      const token = localStorage.getItem("token");

      const res = await axios.get(`/api/seller/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Ensure socialLinks are not null
      const data = {
        ...res.data,
        socialLinks: res.data.socialLinks || { facebook: "", instagram: "", twitter: "" }
      };

      setProfile(data);
      console.log(res.data, "hello");
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "storeLogo") {
      setProfile((prev) => ({ ...prev, storeLogo: files[0] }));
    } else if (["facebook", "instagram", "twitter"].includes(name)) {
      setProfile((prev) => ({
        ...prev,
        socialLinks: { ...prev.socialLinks, [name]: value }
      }));
    } else {
      setProfile((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleUpdate = async () => {
    try {
      const id = localStorage.getItem("sellerId");
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("name", profile.name);
      formData.append("phone", profile.phone);
      formData.append("address", profile.address);
      formData.append("storeName", profile.storeName);
      formData.append("bankAccount", profile.bankAccount);
      formData.append("upiId", profile.upiId);
      formData.append("paypalId", profile.paypalId);

      if (profile.storeLogo) {
        formData.append("storeLogo", profile.storeLogo);
      }

      formData.append("facebook", profile.socialLinks.facebook);
      formData.append("instagram", profile.socialLinks.instagram);
      formData.append("twitter", profile.socialLinks.twitter);

      await axios.put(`/api/seller/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile!");
    }
  };

  const handleDelete = async () => {
    try {
      const id = localStorage.getItem("sellerId");
      const token = localStorage.getItem("token");

      await axios.delete(`/api/seller/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Account deleted successfully!");
      // Optional: clear localStorage or redirect
    } catch (err) {
      console.error("Error deleting account:", err);
    }
  };

  return (
    <>
      <SellerHead />
      <SellerHeader />
      <section id="mid">
        <div className="container-fluid">
          <div className="row">
            <LeftSideBar />
            <div className="col-md-9 p-4">
              <h2 className="mb-4">PROFILE MANAGEMENT</h2>
              <div className="card p-4 w-100">
                <div className="row g-3">
                  <InputField label="Name" name="name" value={profile.name} onChange={handleChange} />
                  <InputField label="Email" name="email" value={profile.businessEmail} disabled />
                  <InputField label="Phone" name="phone" value={profile.businessPhone} onChange={handleChange} />
                  <InputField label="Address" name="address" value={profile.country} onChange={handleChange} />
                  <InputField label="Store Name" name="storeName" value={profile.businessName} onChange={handleChange} />
                  <InputField label="Store Logo" name="storeLogo" type="file" onChange={handleChange} />
                  <InputField label="Bank Account" name="bankAccount" value={profile.accountNumber} onChange={handleChange} />
                  <InputField label="UPI ID" name="upiId" value={profile.upiId} onChange={handleChange} />
                  <InputField label="PayPal ID" name="paypalId" value={profile.paypalId} onChange={handleChange} />
                  <InputField label="Facebook" name="facebook" value={profile.socialLinks.facebook} onChange={handleChange} />
                  <InputField label="Instagram" name="instagram" value={profile.socialLinks.instagram} onChange={handleChange} />
                  <InputField label="Twitter" name="twitter" value={profile.socialLinks.twitter} onChange={handleChange} />
                </div>
                <div className="d-flex justify-content-center mt-3">
                  <button className="btn btn-primary" onClick={handleUpdate}>Update Profile</button>
                  <button className="btn btn-danger ms-3" onClick={handleDelete}>Delete Account</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const InputField = ({ label, name, value, onChange, type = "text", disabled = false }) => (
  <div className="col-md-6">
    <label className="form-label">{label}</label>
    {type === "file" ? (
      <input type="file" className="form-control" name={name} onChange={onChange} />
    ) : (
      <input
        type={type}
        className="form-control"
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    )}
  </div>
);

export default ProfileManage;
