import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Badge, ProgressBar, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../common/Header";
import Footer from "../common/Footer";
import { useNavigate } from 'react-router-dom';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 🔹 Fetch userId from JWT token stored in localStorage
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/orders/user/${userId}/orders`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Failed to fetch orders");

        setOrders(Array.isArray(data) ? data : data.orders || []);
        //setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchOrders();
  }, [token]);

  const getStatusProgress = (status) => {
    
    switch (status) {
      case "Pending": return 25;
      case "Processing": return 50;
      case "Shipped": return 75;
      case "Delivered": return 100;
      default: return 10;
    }
  };

  const getRandomGradient = () => {
    const gradients = [
      "linear-gradient(135deg, #FFDEE9, #B5FFFC)",
      "linear-gradient(135deg, #89F7FE, #66A6FF)",
      "linear-gradient(135deg, #F6D365, #FDA085)",
      "linear-gradient(135deg, #FF9A9E, #FAD0C4)",
      "linear-gradient(135deg, #A1FFCE, #FAFFD1)",
      "linear-gradient(135deg, #C2FFD8, #465EFB)",
      "linear-gradient(135deg, #FBC2EB, #A6C1EE)"
    ];
    return gradients[Math.floor(Math.random() * gradients.length)];
  };

  return (
    <>
      <Header />
      <Container className="my-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">My Orders</h2>
          <button
            className="btn btn-dark fw-bold"
            onClick={() => navigate("/Home")}
          >
            Go to Dashboard
          </button>
        </div>
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <Row>
            {orders.map((order) => (
              <Col md={3} sm={6} xs={12} key={order._id} className="mb-4">
                <Card
                  className="shadow-lg border-0 h-100 rounded-4 text-dark"
                  style={{ background: getRandomGradient() }}
                >
                  <Card.Body>
                    {/* Order Header */}
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h6 className="text-truncate">
                        ID: <Badge bg="dark">{order._id.slice(-6)}</Badge>
                      </h6>
                      <Badge bg="info">{order.status}</Badge>
                    </div>

                    <ul className="list-group small mb-2">
                      {order.items.slice(0, 2).map((item, idx) => (
                        <li
                          key={idx}
                          className="list-group-item p-1 d-flex justify-content-between align-items-center"
                        >
                          <div className="text-muted small">
                            Ordered At: {new Date(order.createdAt).toLocaleString()} <br />
                            Last Updated At: {new Date(order.updatedAt).toLocaleString()}
                          </div>

                        </li>
                      ))}
                      {order.items.length > 2 && (
                        <li className="list-group-item p-1 text-center text-muted">
                          + {order.items.length - 2} more
                        </li>
                      )}
                    </ul>



                    {/* Order Details */}
                    <div className="small mb-2">
                      <p><strong>Total:</strong> ₹{order.totalPrice}</p>
                      <p><strong>Payment:</strong> {order.paymentMethod}</p>
                    </div>

                    {/* Progress */}
                    <ProgressBar
                      now={getStatusProgress(order.orderStatus)}
                      className="mb-2"
                      style={{ height: "8px" }}
                    />
                    <div className="d-flex justify-content-between small text-muted">
                      <small>Pending</small>
                      <small>Processing</small>
                      <small>Shipped</small>
                      <small>Delivered</small>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}

      </Container>

      <Footer />
    </>
  );
};

export default MyOrders;
