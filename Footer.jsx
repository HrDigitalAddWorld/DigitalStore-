import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  useEffect(() => {
    const footerSection = document.getElementById("Footer");
    if (footerSection) {
      footerSection.classList.add("animate-fade-in");
    }

    const socialIcons = document.querySelectorAll(".social-icon");
    socialIcons.forEach((icon, index) => {
      setTimeout(() => {
        icon.classList.add("animate-bounce");
      }, index * 200);
    });
  }, []);

  return (
    <>
      <section id="Footer" className="opacity-0 transition-opacity duration-1000">
        <footer
          className="text-white p-5 position-relative overflow-hidden"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.7)), url('https://via.placeholder.com/1920x600')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Animated Background Elements */}
          <div className="position-absolute top-0 start-0 w-100 h-100" style={{ zIndex: 1 }}>
            {/* Animated Digital Store Text */}
            {[...Array(5)].map((_, i) => (
              <div
                key={`text-${i}`}
                className="position-absolute text-uppercase fw-bold moving-text"
                style={{
                  fontSize: "120px",
                  color: "rgba(255, 255, 255, 0.06)", // darkened from 0.03
                  left: `${Math.random() * 80}%`,
                  top: `${i * 20}%`,
                  transform: "rotate(-10deg)",
                  animation: "moveText 30s linear infinite",
                  animationDelay: `${i * 2}s`,
                  whiteSpace: "nowrap",
                }}
              >
                Digital Store
              </div>
            ))}

            {/* Animated Triangles */}
            {[...Array(12)].map((_, i) => (
              <div
                key={`triangle-${i}`}
                className="position-absolute triangle"
                style={{
                  left: `${Math.random() * 90}%`,
                  top: `${Math.random() * 90}%`,
                  animation: "rotateFade 15s linear infinite",
                  animationDelay: `${i * 0.7}s`,
                  opacity: 0.2,
                }}
              />
            ))}
          </div>

          <div
            className="position-absolute top-0 start-0 w-100 h-100 animate-pulse"
            style={{
              background:
                "linear-gradient(to right, rgba(10, 20, 90, 0.3), rgba(90, 10, 120, 0.3))",
              zIndex: 2,
              animationDuration: "8s",
            }}
          ></div>

          <div className="container position-relative" style={{ zIndex: 3 }}>
            <div className="row text-center text-lg-start">
              <div className="col-lg-3 mb-4">
                <h5 className="text-white mb-3">Digital Store</h5>
                <p>
                  Your one-stop solution for all digital products. Get the best
                  deals on software, tools, and services.
                </p>
              </div>
              <div className="col-lg-3 mb-4">
                <h6 className="text-white mb-3">Quick Links</h6>
                <ul className="list-unstyled">
                  <li><Link to="/" className="text-white text-decoration-none d-block mb-2">Home</Link></li>
                  <li><Link to="/shop" className="text-white text-decoration-none d-block mb-2">Shop</Link></li>
                  <li><Link to="/about" className="text-white text-decoration-none d-block mb-2">About Us</Link></li>
                  <li><Link to="/contact" className="text-white text-decoration-none d-block">Contact</Link></li>
                </ul>
              </div>
              <div className="col-lg-3 mb-4">
                <h6 className="text-white mb-3">Customer Support</h6>
                <ul className="list-unstyled">
                  <li><Link to="/faq" className="text-white text-decoration-none d-block mb-2">FAQs</Link></li>
                  <li><Link to="/returns" className="text-white text-decoration-none d-block mb-2">Return Policy</Link></li>
                  <li><Link to="/shipping" className="text-white text-decoration-none d-block mb-2">Shipping Info</Link></li>
                  <li><Link to="/terms" className="text-white text-decoration-none d-block">Terms & Conditions</Link></li>
                </ul>
              </div>
              <div className="col-lg-3 mb-4">
                <h6 className="text-white mb-3">Contact</h6>
                <p>📍 Jaipur, Rajasthan, India</p>
                <p>✉️ support@digitalstore.com</p>
                <p>📱 +91 7300004094</p>
              </div>
            </div>

            <hr className="border-light" />

            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
              <p className="mb-2 mb-md-0">© {new Date().getFullYear()} Digital Store. All rights reserved.</p>
              <div className="d-flex gap-3">
                <a href="#" className="text-white social-icon"><FontAwesomeIcon icon={faFacebookF} /></a>
                <a href="#" className="text-white social-icon"><FontAwesomeIcon icon={faTwitter} /></a>
                <a href="#" className="text-white social-icon"><FontAwesomeIcon icon={faInstagram} /></a>
                <a href="#" className="text-white social-icon"><FontAwesomeIcon icon={faLinkedin} /></a>
              </div>
            </div>
          </div>
        </footer>
      </section>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        @keyframes moveText {
          0% { transform: translateX(10%) rotate(-10deg); }
          100% { transform: translateX(-100%) rotate(-10deg); }
        }

        @keyframes rotateFade {
          0% { transform: rotate(0deg) scale(1); opacity: 0.1; }
          50% { transform: rotate(180deg) scale(1.2); opacity: 0.2; }
          100% { transform: rotate(360deg) scale(1); opacity: 0.1; }
        }

        .triangle {
          width: 0;
          height: 0;
          border-left: 20px solid transparent;
          border-right: 20px solid transparent;
          border-bottom: 35px solid rgba(255, 255, 255, 0.1);
        }

        .animate-fade-in {
          opacity: 1 !important;
          animation: fade-in 1s ease forwards;
        }

        .animate-bounce {
          animation: bounce 1s ease infinite;
        }
        
        .moving-text {
          white-space: nowrap;
          overflow: hidden;
          position: absolute;
        }
      `}</style>
    </>
  );
}

export default Footer;
