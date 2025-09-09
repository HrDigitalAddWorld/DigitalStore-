import React, { useEffect, useState } from "react";
import axios from "axios";
import SellerAdminLayout from "../Seller/Partials/SellerAdminLayout";

const OrderManage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  
  // Fetch merchant orders
  const fetchOrders = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found in localStorage");
      setLoading(false);
      return;
    }
    console.log(token);
    const res = await axios.get(`http://localhost:5000/api/orders/merchant`, {
      headers: {
        Authorization: `Bearer ${token}`,  // ✅ only add Bearer once
      },
    });

    setOrders(res.data);
    console.log(res.data,"hh");
    setLoading(false);
  } catch (error) {
    
    console.error("Failed to fetch merchant orders", error);
    setLoading(false);
  }
};



  useEffect(() => {
    fetchOrders();
  }, []);

  // Update order status
  const handleStatusChange = async (id, newStatus) => {
    try {
     await axios.put(
  `http://localhost:5000/api/orders/${id}/status`,
  { orderStatus: newStatus },
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }
); // <-- status update API
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === id ? { ...order, orderStatus: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Failed to update order status", error);
    }
  };

  return (
    <SellerAdminLayout>
      <div className="container-fluid mt-4">
        <h2 className="mb-4 text-center">Order Management</h2>

        {loading ? (
          <div className="text-center">Loading orders...</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered w-100">
              <thead className="table-dark">
                <tr>
                  <th>Order ID</th>
                  <th>Products</th>
                  <th>Total Price</th>
                  <th>Payment Method</th>
                  <th>Payment Status</th>
                  <th>Order Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>
  {order.items.map((item, idx) => (
    <div key={idx}>{item.product?.name || "N/A"}</div>
  ))}
</td>
                    <td>₹{order.totalPrice}</td>
                    <td>{order.paymentMethod}</td>
                    <td>{order.paymentStatus}</td>
                    <td>
                      <select
                        className="form-select"
                        value={order.orderStatus}
                        onChange={(e) =>
                          handleStatusChange(order._id, e.target.value)
                        }
                      >
                        <option value="Pending">Pending</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td>
                      <button className="btn btn-info btn-sm me-2">Invoice</button>
                      <button className="btn btn-warning btn-sm">Print Label</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </SellerAdminLayout>
  );
};

export default OrderManage;
