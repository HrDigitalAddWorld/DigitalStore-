import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import LeftSideBar from "../Seller/Partials/LeftSideBar";
import SellerHeader from "../Seller/Partials/SellerHeader";
import SellerHead from "../Seller/Partials/SellerHead";

const ReportAnalytic = ({ children }) => {
  const [summary, setSummary] = useState({
    totalSales: 0,
    ordersProcessed: 0,
    pendingOrders: 0,
  });
  const [revenueData, setRevenueData] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all report data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [summaryRes, revenueRes, ordersRes] = await Promise.all([
          axios.get("https://your-api.com/summary"),
          axios.get("https://your-api.com/revenue"),
          axios.get("https://your-api.com/orders"),
        ]);

        setSummary(summaryRes.data);
        setRevenueData(revenueRes.data);
        setOrders(ordersRes.data);
      } catch (err) {
        console.error("Error loading report data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <SellerHead />
      <SellerHeader />

      <section id="mid">
        <div className="container-fluid">
          <div className="row">
            <LeftSideBar />
            <div className="col-md-9">
              <h2 className="text-center">REPORT ANALYTICS</h2>

              {/* Sales Summary */}
              <div className="row text-center my-4">
                <div className="col-md-4">
                  <div className="card shadow p-3">
                    <h5>Total Sales</h5>
                    <h3 className="text-success">${summary.totalSales.toLocaleString()}</h3>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card shadow p-3">
                    <h5>Orders Processed</h5>
                    <h3 className="text-primary">{summary.ordersProcessed}</h3>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card shadow p-3">
                    <h5>Pending Orders</h5>
                    <h3 className="text-warning">{summary.pendingOrders}</h3>
                  </div>
                </div>
              </div>

              {/* Revenue Chart */}
              <div className="card shadow p-3 mt-4">
                <h5 className="mb-3">Revenue Chart</h5>
                {loading ? (
                  <p>Loading chart...</p>
                ) : (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="revenue" fill="#0d6efd" />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>

              {/* Orders Table */}
              <div className="card shadow p-3 mt-4">
                <h5 className="mb-3">Recent Orders</h5>
                {loading ? (
                  <p>Loading orders...</p>
                ) : (
                  <table className="table table-bordered table-striped">
                    <thead className="thead-dark">
                      <tr>
                        <th>#</th>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Amount</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order, index) => (
                        <tr key={order.id}>
                          <td>{index + 1}</td>
                          <td>{order.orderId}</td>
                          <td>{order.customer}</td>
                          <td>${order.amount}</td>
                          <td>
                            <span
                              className={`badge ${
                                order.status === "Completed"
                                  ? "bg-success"
                                  : order.status === "Pending"
                                  ? "bg-warning"
                                  : "bg-secondary"
                              }`}
                            >
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              {children}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ReportAnalytic;
