import React, { useState, useEffect } from "react";
import Header from "../common/Header";
import { useNavigate } from "react-router-dom";
import Footer from "../common/Footer";
import { FaTrash, FaShoppingCart, FaMapMarkerAlt, FaPlus, FaMinus } from "react-icons/fa";
import axios from "axios";

const Cart = () => {
  const [cart, setCart] = useState({
    deliveryAddress: "",
    items: [],
    timestamp: new Date().toISOString(),
  });

  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [tempAddress, setTempAddress] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("cart")) || [];
    const storedAddress = localStorage.getItem("deliveryAddress") || "";

    if (!storedAddress) {
      setIsAddressModalOpen(true);
    }

    setCart((prev) => ({
      ...prev,
      deliveryAddress: storedAddress,
      items: storedItems,
    }));
  }, []);

  const updateCartAndStorage = (items) => {
    localStorage.setItem("cart", JSON.stringify(items));
    setCart((prev) => ({ ...prev, items }));
  };

  const increaseQuantity = (index) => {
    const updatedItems = [...cart.items];
    updatedItems[index].quantity += 1;
    updateCartAndStorage(updatedItems);
  };

  const decreaseQuantity = (index) => {
    const updatedItems = [...cart.items];
    if (updatedItems[index].quantity > 1) {
      updatedItems[index].quantity -= 1;
    } else {
      updatedItems.splice(index, 1);
    }
    updateCartAndStorage(updatedItems);
  };

  const removeItemFromCart = (index) => {
    const updatedItems = cart.items.filter((_, i) => i !== index);
    updateCartAndStorage(updatedItems);
  };

  const handleChangeAddress = () => {
    setTempAddress(cart.deliveryAddress);
    setIsAddressModalOpen(true);
  };

  const handleSaveAddress = () => {
    if (tempAddress.trim() !== "") {
      localStorage.setItem("deliveryAddress", tempAddress.trim());
      setCart((prev) => ({ ...prev, deliveryAddress: tempAddress.trim() }));
    }
    setIsAddressModalOpen(false);
  };

  const handlePlaceOrder = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      const response = await axios.get(
        `http://localhost:5000/api/cart/${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const latestCart = response.data.cart;

      if (!latestCart || latestCart.items.length === 0) {
        alert("Your cart is empty!");
        return;
      }

      const totalPrice = latestCart.items.reduce(
        (total, item) =>
          total +
          ((item.product?.price ?? item.price ?? 0) * item.quantity),
        0
      );

      localStorage.setItem("totalPrice", totalPrice);

      navigate("/checkout", { state: { cart: latestCart, totalPrice } });

    } catch (error) {
      console.error("Error fetching cart:", error);
      alert("Unable to fetch cart. Please try again.");
    }
  };

  return (
    <>
      <Header />

      <div className="container mt-5">
        <h2 className="mb-4">
          <FaShoppingCart /> My Cart
        </h2>

        <div className="alert alert-info d-flex align-items-center justify-content-between">
          <div>
            <FaMapMarkerAlt className="me-2" />
            <strong>Deliver to:</strong>{" "}
            {cart.deliveryAddress || "No address set"}
          </div>
          <button className="btn btn-link" onClick={handleChangeAddress}>
            Change
          </button>
        </div>

        <div className="row">
          {/* Cart Items */}
          <div className="col-md-8">
            {cart.items.length > 0 ? (
              cart.items.map((item, index) => (
                <div key={index} className="card mb-3 shadow-sm p-3">
                  <div className="row g-0">
                    {/* Product Image */}
                    <div className="col-md-3">
                      <img
                        src={item.image}
                        alt={item.product}
                        className="img-fluid rounded"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="col-md-6">
                      <h5>{item.product?.name || item.name || "Product"}</h5>
                      <p className="text-muted">
                        ₹{item.product?.price ?? item.price ?? 0}
                      </p>

                      <div className="d-flex align-items-center">
                        <button
                          className="btn btn-outline-primary btn-sm me-2"
                          onClick={() => decreaseQuantity(index)}
                        >
                          <FaMinus />
                        </button>
                        <span className="fw-bold">{item.quantity}</span>
                        <button
                          className="btn btn-outline-primary btn-sm ms-2"
                          onClick={() => increaseQuantity(index)}
                        >
                          <FaPlus />
                        </button>
                      </div>

                      <p className="text-muted">
                        Added on:{" "}
                        {item.addedAt
                          ? new Date(item.addedAt).toLocaleDateString()
                          : "N/A"}
                      </p>
                    </div>

                    {/* Remove Item */}
                    <div className="col-md-3 d-flex align-items-center">
                      <button
                        className="btn btn-danger"
                        onClick={() => removeItemFromCart(index)}
                      >
                        <FaTrash /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted">Your cart is empty!</p>
            )}
          </div>

          {/* Price Details */}
          <div className="col-md-4 mb-4">
            <div className="card p-3 shadow-sm">
              <h5>Price Details</h5>
              <hr />
              <p>Total Items: {cart.items.length}</p>
              <p>
                Total Price: ₹{" "}
                {cart.items.reduce(
                  (total, item) =>
                    total +
                    ((item.product?.price ?? item.price ?? 0) * item.quantity),
                  0
                )}
              </p>
              <button
                className="btn btn-primary w-100"
                onClick={handlePlaceOrder}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delivery Address Modal */}
      {isAddressModalOpen && (
        <div
          className="modal fade show"
          style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update Delivery Address</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setIsAddressModalOpen(false)}
                ></button>
              </div>

              <div className="modal-body">
                <textarea
                  className="form-control"
                  rows="3"
                  value={tempAddress}
                  onChange={(e) => setTempAddress(e.target.value)}
                  placeholder="Enter your delivery address"
                />
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setIsAddressModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleSaveAddress}
                >
                  Save Address
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Cart;
