import React, { useEffect, useState } from "react";
import axios from "axios";
import LeftSideBar from "./Partials/LeftSideBar";
import SellerHeader from "./Partials/SellerHeader";
import SellerHead from "./Partials/SellerHead";

const DiscountAndOffres = ({ children }) => {
  const [summary, setSummary] = useState({
    active: 0,
    upcoming: 0,
    expired: 0,
  });

  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        const res = await axios.get("https://your-api-url.com/discounts");
        const { summary, offers } = res.data;
        setSummary(summary);
        setOffers(offers);
      } catch (err) {
        console.error("Error fetching discounts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDiscounts();
  }, []);

  const handleAddDiscount = () => {
    alert("Redirecting to add discount form...");
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
              <h2 className="text-center">DISCOUNT & OFFERS</h2>

              {/* Discount Overview */}
              <div className="row text-center my-4">
                <div className="col-md-4">
                  <div className="card shadow p-3">
                    <h5>Active Discounts</h5>
                    <h3 className="text-success">{summary.active}</h3>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card shadow p-3">
                    <h5>Upcoming Offers</h5>
                    <h3 className="text-warning">{summary.upcoming}</h3>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card shadow p-3">
                    <h5>Expired Offers</h5>
                    <h3 className="text-danger">{summary.expired}</h3>
                  </div>
                </div>
              </div>

              {/* Discount Table */}
              <div className="card shadow p-3">
                <h5 className="mb-3">Current Discounts & Offers</h5>
                {loading ? (
                  <p>Loading offers...</p>
                ) : offers.length === 0 ? (
                  <p>No offers available.</p>
                ) : (
                  <table className="table table-bordered table-striped">
                    <thead className="thead-dark">
                      <tr>
                        <th>#</th>
                        <th>Offer Name</th>
                        <th>Discount</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {offers.map((offer, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{offer.name}</td>
                          <td>{offer.discount}</td>
                          <td>{offer.startDate}</td>
                          <td>{offer.endDate}</td>
                          <td
                            className={
                              offer.status === "Active"
                                ? "text-success"
                                : offer.status === "Upcoming"
                                ? "text-warning"
                                : "text-danger"
                            }
                          >
                            {offer.status}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              {/* Add New Discount Button */}
              <div className="text-center mt-4">
                <button className="btn btn-primary btn-lg" onClick={handleAddDiscount}>
                  Add New Discount
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

export default DiscountAndOffres;
