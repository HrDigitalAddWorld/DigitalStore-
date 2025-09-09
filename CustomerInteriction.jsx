import React, { useEffect, useState } from "react";
import axios from "axios";
import LeftSideBar from "./Partials/LeftSideBar";
import SellerHeader from "./Partials/SellerHeader";
import SellerHead from "./Partials/SellerHead";

const CustomerInteriction = ({ children }) => {
  const [summary, setSummary] = useState({
    totalMessages: 0,
    newInquiries: 0,
    resolvedQueries: 0,
  });

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInteractionData = async () => {
      try {
        const res = await axios.get("https://your-api-url.com/interactions");
        const { summary, messages } = res.data;
        setSummary(summary);
        setMessages(messages);
      } catch (error) {
        console.error("Error fetching interaction data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInteractionData();
  }, []);

  const handleRespondClick = () => {
    alert("Redirecting to messaging center...");
  };

  return (
    <>
      <SellerHead />
      <SellerHeader />

      <section id="mid">
        <div className="container-fluid">
          <div className="row">
            <LeftSideBar />
            <div className="col-md-9">
              <h2 className="text-center">CUSTOMER INTERACTION</h2>

              {/* Interaction Overview */}
              <div className="row text-center my-4">
                <div className="col-md-4">
                  <div className="card shadow p-3">
                    <h5>Total Messages</h5>
                    <h3 className="text-success">{summary.totalMessages}</h3>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card shadow p-3">
                    <h5>New Inquiries</h5>
                    <h3 className="text-warning">{summary.newInquiries}</h3>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card shadow p-3">
                    <h5>Resolved Queries</h5>
                    <h3 className="text-primary">{summary.resolvedQueries}</h3>
                  </div>
                </div>
              </div>

              {/* Messages Table */}
              <div className="card shadow p-3">
                <h5 className="mb-3">Recent Messages</h5>
                {loading ? (
                  <p>Loading messages...</p>
                ) : messages.length === 0 ? (
                  <p>No messages found.</p>
                ) : (
                  <table className="table table-bordered table-striped">
                    <thead className="thead-dark">
                      <tr>
                        <th>#</th>
                        <th>Customer Name</th>
                        <th>Message</th>
                        <th>Date</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {messages.map((msg, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{msg.customerName}</td>
                          <td>{msg.message}</td>
                          <td>{msg.date}</td>
                          <td
                            className={
                              msg.status.toLowerCase() === "resolved"
                                ? "text-success"
                                : "text-warning"
                            }
                          >
                            {msg.status}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              {/* Respond Button */}
              <div className="text-center mt-4">
                <button className="btn btn-primary btn-lg" onClick={handleRespondClick}>
                  Respond to Messages
                </button>
              </div>

              {children}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CustomerInteriction;
