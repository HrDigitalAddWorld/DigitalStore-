import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Badge, Modal, ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../common/Header';
import Footer from '../common/Footer';
import "../Customer/CheckoutSection.css";  // ✅ Correct file name
import { useNavigate } from 'react-router-dom';

const CheckoutSection = () => {
  const [timeLeft, setTimeLeft] = useState({ minutes: 11, seconds: 57 });
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [upiOption, setUpiOption] = useState('qr');
  const [screenshot, setScreenshot] = useState(null);
  const [transactionId, setTransactionId] = useState('');
  const navigate = useNavigate();
  // Address state
  const [deliveryAddress, setDeliveryAddress] = useState(localStorage.getItem("deliveryAddress") || "");
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [pastAddresses, setPastAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState("");
  const [orderSummary, setOrderSummary] = useState({
    items: [],
    totalPrice: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft.seconds > 0) {
        setTimeLeft({ ...timeLeft, seconds: timeLeft.seconds - 1 });
      } else if (timeLeft.minutes > 0) {
        setTimeLeft({ minutes: timeLeft.minutes - 1, seconds: 59 });
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Load past addresses from localStorage
  useEffect(() => {
    const storedAddresses = JSON.parse(localStorage.getItem("pastAddresses") || "[]");
    setPastAddresses(storedAddresses);

  }, []);

  useEffect(() => {
    try {
      const storedItems = JSON.parse(localStorage.getItem("cart")) || [];
      const storedTotalPrice = parseFloat(localStorage.getItem("totalPrice")) || 0;

      setOrderSummary({
        items: storedItems,
        totalPrice: storedTotalPrice,
      });
    } catch (error) {
      console.error("Error loading cart data:", error);
    }
  }, []);

  const handleScreenshotChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setScreenshot(URL.createObjectURL(file));
    }
  };

  const handleSelectAddress = (address) => {
    setDeliveryAddress(address);
    localStorage.setItem("deliveryAddress", address);

    // Update past addresses, moving selected one to top
    const updatedAddresses = [address, ...pastAddresses.filter(a => a !== address)];
    localStorage.setItem("pastAddresses", JSON.stringify(updatedAddresses));
    setPastAddresses(updatedAddresses);

    setShowAddressModal(false);
  };

  const handleAddAddress = () => {
    if (!newAddress.trim()) return;
    setDeliveryAddress(newAddress);
    localStorage.setItem("deliveryAddress", newAddress);

    const updatedAddresses = [newAddress, ...pastAddresses.filter(a => a !== newAddress)];
    localStorage.setItem("pastAddresses", JSON.stringify(updatedAddresses));
    setPastAddresses(updatedAddresses);

    setNewAddress("");
    setShowAddressModal(false);
  };

  const handlePlaceOrder = async () => {
  const orderData = {
    userId: localStorage.getItem("sellerId"),  
    shippingAddress: { address: deliveryAddress }, 
    paymentMethod,
    transactionId,
    screenshot,
  };

  console.log(orderData, "orderdata");

  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  console.log("role", role);
  console.log("token", token);

  try {
    const response = await fetch("http://localhost:5000/api/orders/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    });

    const data = await response.json(); // ✅ only once

    if (!response.ok) {
      throw new Error(data.message || "Order creation failed");
    }

    console.log("Created order:", data);

    // Clear cart if needed
    localStorage.removeItem("cart");
    localStorage.removeItem("totalPrice");

    // Navigate to MyOrders page
    navigate("/myorders");
  } catch (error) {
    alert(error.message || "Failed to place order.");
  }
};


  return (
    <>
      <Header />

      <Container className="my-4">
        <Row>
          <Col md={8}>
            {/* Checkout Steps */}
            <div className="checkout-steps">
              {/* Step 1: Login */}
              <Card className="mb-3 fade-in theme-card">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <span className="rounded-circle bg-light px-2 py-1 mr-2">1</span>
                      <strong className="ms-2">LOGIN</strong>
                      <i className="bi bi-check-circle-fill text-success ms-2"></i>
                      <div className="ms-4 mt-1">{localStorage.getItem("email")}</div>
                    </div>
                    {/* <Button variant="outline-primary">CHANGE</Button> */}
                  </div>
                </Card.Body>
              </Card>

              {/* Step 2: Delivery Address */}
              <Card className="mb-3 fade-in theme-card">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <span className="rounded-circle bg-light px-2 py-1 mr-2">2</span>
                      <strong className="ms-2">DELIVERY ADDRESS</strong>
                      <i className="bi bi-check-circle-fill text-success ms-2"></i>
                      <div className="ms-4 mt-1">{deliveryAddress}</div>
                    </div>
                    <Button variant="outline-primary" onClick={() => setShowAddressModal(true)}>CHANGE</Button>
                  </div>
                </Card.Body>
              </Card>

              {/* Step 3: Order Summary */}
              <Card className="mb-3 fade-in theme-card">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <span className="rounded-circle bg-light px-2 py-1 mr-2">3</span>
                      <strong className="ms-2">ORDER SUMMARY</strong>
                      <i className="bi bi-check-circle-fill text-success ms-2"></i>
                      <div className="ms-4 mt-1">{orderSummary.items.length} items</div>
                    </div>
                    {/* <Button variant="outline-primary">CHANGE</Button> */}
                  </div>
                </Card.Body>
              </Card>

              {/* Step 4: Payment Options */}
              <Card className="mb-3 border-primary fade-in theme-card">
                <Card.Body className="bg-primary bg-opacity-10">
                  <div>
                    <span className="rounded-circle bg-primary text-white px-2 py-1 mr-2">4</span>
                    <strong className="ms-2">PAYMENT OPTIONS</strong>
                  </div>

                  {/* Payment Timer */}
                  <div className="bg-warning bg-opacity-25 p-2 mt-3 rounded">
                    <div className="d-flex align-items-center">
                      <span>Complete payment in</span>
                      <div className="ms-2 d-flex align-items-center">
                        <i className="bi bi-clock-history"></i>
                        <span className="ms-1">
                          {String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Methods */}
                  <Form className="mt-3">
                    <div className="mb-3">
                      <Form.Check
                        type="radio"
                        id="upi"
                        name="paymentMethod"
                        label="UPI"
                        checked={paymentMethod === 'upi'}
                        onChange={() => setPaymentMethod('upi')}
                      />

                      {paymentMethod === 'upi' && (
                        <div className="ms-4 mt-2">
                          <div className="mb-3">
                            <Form.Check
                              type="radio"
                              id="qrCode"
                              name="upiOption"
                              label="Scan QR Code"
                              checked={upiOption === 'qr'}
                              onChange={() => setUpiOption('qr')}
                              className="mb-2"
                            />
                            {upiOption === 'qr' && (
                              <div className="ms-4">
                                <div className="text-center mb-2">
                                  <img
                                    src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=shrishtikumari031122@okhdfcbank&pn=Shrishti%20Kumari&am=212&tn=Payment%20for%20order"
                                    alt="UPI QR Code"
                                    className="img-fluid border p-2 bg-white"
                                    style={{ maxWidth: '200px' }}
                                  />

                                </div>
                                <p className="text-center mb-1">
                                  <strong>UPI ID:</strong> seller@upi
                                </p>
                                <small className="text-muted d-block text-center">Scan this QR code using any UPI app</small>
                              </div>
                            )}
                          </div>

                          <Form.Check
                            type="radio"
                            id="manualUpi"
                            name="upiOption"
                            label="Manual UPI Payment"
                            checked={upiOption === 'manual'}
                            onChange={() => setUpiOption('manual')}
                            className="mb-2"
                          />
                          {upiOption === 'manual' && (
                            <div className="ms-4">
                              <div className="alert alert-info">
                                <p className="mb-1"><strong>UPI ID:</strong> seller@upi</p>
                                <p className="mb-1"><strong>Name:</strong> Seller Name</p>
                                <p className="mb-1"><strong>Amount:</strong> ₹212</p>
                              </div>
                              <small className="text-muted">Send payment to this UPI ID using any UPI app</small>
                            </div>
                          )}

                          {/* Payment Proof Section */}
                          <div className="mt-4 border-top pt-3">
                            <h6 className="mb-3">Payment Verification</h6>

                            <Form.Group className="mb-3">
                              <Form.Label>Upload Payment Screenshot</Form.Label>
                              <Form.Control
                                type="file"
                                accept="image/*"
                                onChange={handleScreenshotChange}
                              />
                              {screenshot && (
                                <div className="mt-2">
                                  <img
                                    src={screenshot}
                                    alt="Payment Screenshot"
                                    className="img-thumbnail"
                                    style={{ maxWidth: '200px' }}
                                  />
                                </div>
                              )}
                            </Form.Group>

                            <Form.Group className="mb-3">
                              <Form.Label>Transaction ID</Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="Enter transaction ID from your UPI app"
                                value={transactionId}
                                onChange={(e) => setTransactionId(e.target.value)}
                              />
                            </Form.Group>
                          </div>
                        </div>
                      )}
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </div>
          </Col>

          {/* Price Details */}
          <Col md={4}>
            <Card className="fade-in price-card">
              <Card.Header className="bg-white">
                <h5 className="mb-0 text-muted">PRICE DETAILS</h5>
              </Card.Header>
              <Card.Body>
                <div className="d-flex justify-content-between mb-2">
                  <span>Price ({orderSummary.items.length} items):</span>
                  <span>₹{orderSummary.totalPrice}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Delivery Charges</span>
                  <span className="text-success">FREE</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Platform Fee</span>
                  <span>₹3</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <strong>Amount Payable</strong>
                  <strong>₹{orderSummary.totalPrice + 3}</strong>
                </div>
              </Card.Body>
            </Card>

            <Card className="mt-3 fade-in price-card">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <span className="text-success">5% Unlimited Cashback on Flipkart Axis Bank Credit Card</span>
                  </div>
                  <i className="bi bi-chevron-right"></i>
                </div>
              </Card.Body>
            </Card>

            <Card className="mt-3 fade-in price-card">
              <Card.Body>
                <div className="d-flex align-items-center">
                  <div className="me-3">
                    <Badge bg="secondary" pill><i className="bi bi-shield-check"></i></Badge>
                  </div>
                  <div>
                    <p className="mb-0">Safe and Secure Payments. Easy returns.</p>
                    <p className="mb-0">100% Authentic products.</p>
                  </div>
                </div>
              </Card.Body>
            </Card>

            <Card className="mt-3 fade-in price-card">
              <Card.Body>
                <div className="d-flex align-items-center">
                  <Button onClick={handlePlaceOrder} variant="success">Place Order</Button>
                </div>
              </Card.Body>
            </Card>

          </Col>
        </Row>
      </Container>

      {/* Address Modal */}
      <Modal show={showAddressModal} onHide={() => setShowAddressModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Choose Delivery Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {pastAddresses.length > 0 && (
            <>
              <h6>Saved Addresses</h6>
              <ListGroup className="mb-3">
                {pastAddresses.map((addr, idx) => (
                  <ListGroup.Item key={idx} action onClick={() => handleSelectAddress(addr)}>
                    {addr}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </>
          )}

          <h6>Add New Address</h6>
          <Form.Control
            type="text"
            placeholder="Enter new address"
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
            className="mb-2"
          />
          <Button variant="primary" onClick={handleAddAddress}>Save Address</Button>
        </Modal.Body>
      </Modal>

      <Footer />
    </>
  );
};

export default CheckoutSection;
