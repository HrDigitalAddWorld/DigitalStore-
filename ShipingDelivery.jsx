import React, { useEffect, useState } from "react";
import LeftSideBar from "./Partials/LeftSideBar";
import SellerHeader from "./Partials/SellerHeader";
import SellerHead from "./Partials/SellerHead";
import axios from "axios"; // Make sure axios is installed

const ShipingDelivery = ({ children }) => {
  const [summary, setSummary] = useState({
    shipped: 0,
    inTransit: 0,
    delivered: 0,
  });
  const [shipments, setShipments] = useState([]);

  useEffect(() => {
    // Fetch summary
    axios.get("/api/shipping/summary").then((res) => {
      setSummary(res.data);
    });

    // Fetch recent shipments
    axios.get("/api/shipping/recent").then((res) => {
      setShipments(res.data);
    });
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
              <h2 className="text-center">SHIPPING & DELIVERY</h2>

              {/* Delivery Summary */}
              <div className="row text-center my-4">
                <div className="col-md-4">
                  <div className="card shadow p-3">
                    <h5>Orders Shipped</h5>
                    <h3 className="text-success">{summary.shipped}</h3>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card shadow p-3">
                    <h5>Orders In Transit</h5>
                    <h3 className="text-warning">{summary.inTransit}</h3>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card shadow p-3">
                    <h5>Orders Delivered</h5>
                    <h3 className="text-primary">{summary.delivered}</h3>
                  </div>
                </div>
              </div>

              {/* Delivery Status Table */}
              <div className="card shadow p-3 mt-4">
                <h5 className="mb-3">Recent Shipments</h5>
                <table className="table table-bordered table-striped">
                  <thead className="thead-dark">
                    <tr>
                      <th>#</th>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Shipping Status</th>
                      <th>Expected Delivery</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shipments.map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.orderId}</td>
                        <td>{item.customerName}</td>
                        <td>
                          <span className={`badge ${
                            item.status === "Delivered"
                              ? "bg-success"
                              : item.status === "In Transit"
                              ? "bg-warning"
                              : "bg-danger"
                          }`}>
                            {item.status}
                          </span>
                        </td>
                        <td>{item.expectedDelivery}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {children}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShipingDelivery;
