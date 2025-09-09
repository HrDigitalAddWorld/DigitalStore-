import React, { useState } from "react";

const DealsOffersForm = ({ onDealAdded }) => {
  const [title, setTitle] = useState("");
  const [discount, setDiscount] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newDeal = { title, discount, expiryDate };

    // 📝 TODO: Replace with API call
    console.log("New deal added:", newDeal);

    // Clear form
    setTitle("");
    setDiscount("");
    setExpiryDate("");

    // Refresh deals table
    if (onDealAdded) onDealAdded();
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        marginBottom: "20px",
        padding: "15px",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <h3>Add New Deal</h3>
      <div style={{ marginBottom: "10px" }}>
        <label>Deal Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ marginLeft: "10px" }}
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>Discount (%):</label>
        <input
          type="number"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          required
          style={{ marginLeft: "10px" }}
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>Expiry Date:</label>
        <input
          type="date"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          required
          style={{ marginLeft: "10px" }}
        />
      </div>
      <button type="submit" style={{ padding: "5px 10px" }}>
        Add Deal
      </button>
    </form>
  );
};

export default DealsOffersForm;
