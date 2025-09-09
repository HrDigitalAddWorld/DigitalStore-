import React, { useEffect, useState } from "react";
import axios from "axios";
import LeftSideBar from "./Partials/LeftSideBar";
import SellerHeader from "./Partials/SellerHeader";
import SellerHead from "./Partials/SellerHead";

const SallesndEarning = ({ children }) => {
  const [summary, setSummary] = useState({
    totalEarnings: 0,
    pendingBalance: 0,
    withdrawable: 0,
  });

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from API
  useEffect(() => {
    const fetchEarningsData = async () => {
      try {
        const response = await axios.get("https://your-api-url.com/earnings");
        const { summary, transactions } = response.data;
        setSummary(summary);
        setTransactions(transactions);
      } catch (error) {
        console.error("Failed to fetch earnings data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEarningsData();
  }, []);

  const handleWithdraw = async () => {
    try {
      await axios.post("https://your-api-url.com/earnings/withdraw");
      alert("Withdrawal request submitted!");
    } catch (error) {
      console.error("Withdrawal request failed:", error);
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
            <div className="col-md-9">
              <h2 className="text-center">SALES AND EARNINGS</h2>

              {/* Earnings Overview */}
              <div className="row text-center my-4">
                <div className="col-md-4">
                  <div className="card shadow p-3">
                    <h5>Total Earnings</h5>
                    <h3 className="text-success">${summary.totalEarnings}</h3>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card shadow p-3">
                    <h5>Pending Balance</h5>
                    <h3 className="text-warning">${summary.pendingBalance}</h3>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card shadow p-3">
                    <h5>Withdrawable Amount</h5>
                    <h3 className="text-primary">${summary.withdrawable}</h3>
                  </div>
                </div>
              </div>

              {/* Transactions Table */}
              <div className="card shadow p-3">
                <h5 className="mb-3">Recent Sales & Transactions</h5>
                {loading ? (
                  <p>Loading transactions...</p>
                ) : transactions.length === 0 ? (
                  <p>No transactions found.</p>
                ) : (
                  <table className="table table-bordered table-striped">
                    <thead className="thead-dark">
                      <tr>
                        <th>#</th>
                        <th>Order ID</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((txn, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{txn.orderId}</td>
                          <td>{txn.date}</td>
                          <td>${txn.amount}</td>
                          <td
                            className={
                              txn.status.toLowerCase() === "completed"
                                ? "text-success"
                                : "text-warning"
                            }
                          >
                            {txn.status}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              {/* Withdrawal Button */}
              <div className="text-center mt-4">
                <button className="btn btn-primary btn-lg" onClick={handleWithdraw}>
                  Request Withdrawal
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

export default SallesndEarning;
