import { Link } from "react-router-dom";
import React from "react";
import {
  FaSlidersH, FaTags, FaMobileAlt, FaQuoteLeft,
  FaUser, FaStore, FaMoneyBillWave
} from "react-icons/fa";
import { RiFootprintLine } from "react-icons/ri";
import { MdProductionQuantityLimits, MdOutlineShoppingCart, MdPayment } from "react-icons/md";

const menuItems = [
  { icon: <FaSlidersH />, label: "Slide Management", path: "/admin/SliderTable" },
  { icon: <FaTags />, label: "Deal Management", path: "/admin/DealofferTable" },
  { icon: <FaMobileAlt />, label: "Gadgets Management", path: "/admin/GadgetsTable" },
  { icon: <FaQuoteLeft />, label: "Testimonial Management", path: "/admin/TestinominalTable" },
  { icon: <RiFootprintLine />, label: "Footer Management" }, // No path
  { icon: <FaUser />, label: "User Management", path: "/admin/UserManage" },
  { icon: <FaStore />, label: "Business Seller Management", path: "/admin/BusinissManage" },
  { icon: <MdPayment />, label: "Payment Settlement", path: "/admin/PaymentSettlemet" },
  { icon: <MdProductionQuantityLimits />, label: "Products Management", path: "/admin/AdminProductsManagement" },
  { icon: <MdOutlineShoppingCart />, label: "Order Management", path: "/admin/AdminOrderManagement" },
  { icon: <FaMoneyBillWave />, label: "User Payments", path: "/admin/AdminUserPayments" }
];

const LeftSidebar = () => {
  return (
    <div className="col-md-3 mt-3">
      <div className="card shadow border-0">
        <div className="card-body p-3">
          <h5 className="mb-3 text-center fw-bold text-uppercase text-primary">Admin Panel</h5>
          <ul className="list-unstyled">
            {menuItems.map((item, index) => (
              <li key={index} className="mb-2">
                {item.path ? (
                  <Link to={item.path} className="text-decoration-none">
                    <button className="btn btn-outline-dark form-control d-flex align-items-center justify-content-start gap-2 sidebar-btn">
                      {item.icon} <span>{item.label}</span>
                    </button>
                  </Link>
                ) : (
                  <button className="btn btn-outline-secondary form-control d-flex align-items-center justify-content-start gap-2 sidebar-btn">
                    {item.icon} <span>{item.label}</span>
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Add custom styling inline or to your CSS */}
      <style>{`
        .sidebar-btn {
          transition: all 0.3s ease;
        }
        .sidebar-btn:hover {
          background-color: #343a40;
          color: #fff;
        }
        .sidebar-btn span {
          font-weight: 500;
          text-transform: capitalize;
        }
      `}</style>
    </div>
  );
};

export default LeftSidebar;
