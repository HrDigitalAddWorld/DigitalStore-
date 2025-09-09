import React, { useState } from "react";
import Header from "./partials/Header";
import LeftSidebar from "./partials/LeftSidebar";
import { FaUserCircle, FaCheck, FaCheckCircle } from "react-icons/fa";
import paymentImage from "../../images/payment.jpg"; // ✅ Correct image import path

const UserPayment = () => {
  const [payments, setPayments] = useState([
    {
      id: 1,
      clientName: 'John Doe',
      transactionId: 'TXN123456789',
      amount: '$150.00',
      image: paymentImage,
      verified: false,
      date: '2023-05-15'
    },
    {
      id: 2,
      clientName: 'Jane Smith',
      transactionId: 'TXN987654321',
      amount: '$200.50',
      image: paymentImage, // ✅ Use imported image
      verified: true,
      date: '2023-05-14'
    },
    {
      id: 3,
      clientName: 'Robert Johnson',
      transactionId: 'TXN456789123',
      amount: '$99.99',
      image: paymentImage, // No image
      verified: false,
      date: '2023-05-13'
    }
  ]);

  const handleVerify = (id) => {
    setPayments(payments.map(payment =>
      payment.id === id ? { ...payment, verified: true } : payment
    ));
  };

  const handleImageError = (e) => {
    e.target.style.display = 'none';
    const fallback = e.target.nextElementSibling;
    if (fallback && fallback.classList.contains('img-fallback')) {
      fallback.style.display = 'block';
    }
  };

  return (
    <>
      <Header />
      <section id="mid">
        <div className="container">
          <div className="row">
            <LeftSidebar />
            <div className="col-md-9 mt-5">
              <div className="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg">
                <h2 className="text-xl font-bold mb-4 text-center">User Payments</h2>
                <div className="border p-4 rounded-lg shadow-md">
                  {payments.map((payment) => (
                    <div key={payment.id} className="mb-4 p-3 border rounded-lg">
                      <div className="row align-items-center">
                        <div className="col-md-3 text-center">
                          <div className="d-flex flex-column align-items-center">
                            {payment.image ? (
                              <>
                                <img
                                  src={payment.image}
                                  alt={payment.clientName}
                                  className="rounded-circle mb-2"
                                  width="80"
                                  height="80"
                                  onError={handleImageError}
                                />
                                <div className="img-fallback" style={{ display: 'none' }}>
                                  <FaUserCircle size={80} className="text-secondary" />
                                </div>
                              </>
                            ) : (
                              <FaUserCircle size={80} className="text-secondary mb-2" />
                            )}
                            <h6 className="font-semibold mb-0">{payment.clientName}</h6>
                            <small className="text-muted">{payment.date}</small>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="mb-2">
                            <span className="font-semibold">Transaction ID: </span>
                            <span className="text-muted">{payment.transactionId}</span>
                          </div>
                          <div className="mb-2">
                            <span className="font-semibold">Amount: </span>
                            <span className="text-success fw-bold">{payment.amount}</span>
                          </div>
                          <div>
                            <span className="font-semibold">Status: </span>
                            <span className={payment.verified ? "text-success" : "text-warning"}>
                              {payment.verified ? "Verified" : "Pending"}
                            </span>
                          </div>
                        </div>

                        <div className="col-md-3 text-center">
                          <button
                            className={`btn btn-${payment.verified ? 'success' : 'primary'} w-100 d-flex align-items-center justify-content-center`}
                            onClick={() => handleVerify(payment.id)}
                            disabled={payment.verified}
                          >
                            {payment.verified ? (
                              <>
                                <FaCheckCircle className="me-2" />
                                Verified
                              </>
                            ) : (
                              <>
                                <FaCheck className="me-2" />
                                Verify
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserPayment;
