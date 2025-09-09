import React, { useEffect, useState } from "react";
import axios from "axios";
import LeftSideBar from "./Partials/LeftSideBar";
import SellerHeader from "./Partials/SellerHeader";
import SellerHead from "./Partials/SellerHead";

const Notifications = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch notifications from API
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get("https://your-api-url.com/notifications");
        setNotifications(response.data);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  // Count summary data
  const newCount = notifications.filter((n) => n.status === "new").length;
  const readCount = notifications.filter((n) => n.status === "read").length;
  const alertCount = notifications.filter((n) => n.status === "alert").length;

  // Clear all notifications
  const handleClearAll = async () => {
    try {
      await axios.delete("https://your-api-url.com/notifications/clear");
      setNotifications([]);
    } catch (error) {
      console.error("Failed to clear notifications:", error);
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
              <h2 className="text-center">NOTIFICATION & ALERT</h2>

              {/* Notification Summary */}
              <div className="row text-center my-4">
                <div className="col-md-4">
                  <div className="card shadow p-3">
                    <h5>New Notifications</h5>
                    <h3 className="text-danger">{newCount}</h3>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card shadow p-3">
                    <h5>Read Notifications</h5>
                    <h3 className="text-success">{readCount}</h3>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card shadow p-3">
                    <h5>Total Alerts</h5>
                    <h3 className="text-warning">{alertCount}</h3>
                  </div>
                </div>
              </div>

              {/* Notification List */}
              <div className="card shadow p-3">
                <h5 className="mb-3">Recent Notifications</h5>
                {loading ? (
                  <p>Loading notifications...</p>
                ) : notifications.length === 0 ? (
                  <p>No notifications found.</p>
                ) : (
                  <ul className="list-group">
                    {notifications.map((notif, index) => (
                      <li
                        key={index}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
                        {notif.message}
                        <span
                          className={`badge ${
                            notif.status === "new"
                              ? "bg-danger"
                              : notif.status === "alert"
                              ? "bg-warning"
                              : "bg-success"
                          }`}
                        >
                          {notif.status.charAt(0).toUpperCase() + notif.status.slice(1)}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Clear Notifications Button */}
              <div className="text-center mt-4">
                <button className="btn btn-primary btn-lg" onClick={handleClearAll}>
                  Clear All Notifications
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

export default Notifications;
