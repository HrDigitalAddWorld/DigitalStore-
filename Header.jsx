import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faStore,
  faUser,
  faSearch,
  faBars,
  faShoppingCart,
  faTruck,
  faClose,
  faRightFromBracket,
  faTv,
  faShoppingBasket,
  faUtensils,
  faTshirt,
  faLaptop,
  faBook,
  faMobileAlt,
  faUserTag,
  faStar,
  faDumbbell
} from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isIconMenuOpen, setIsIconMenuOpen] = useState(false);
  const [showCategoryNav, setShowCategoryNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showSidebar, setShowSidebar] = useState(false);
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);



  const categories = [
    {
      label: "Electronic",
      to: "/electronic",
      icon: faTv,
      subcategories: [
        { to: "/Mobile", label: "Mobile", icon: faMobileAlt },
        { to: "/Tv", label: "TV", icon: faTv },
        { to: "/Laptop", label: "Laptops", icon: faLaptop },
        { to: "/Books", label: "Books", icon: faBook },
        { to: "/Fashion", label: "Fashion", icon: faUserTag },
        { to: "/Computer", label: "Computer", icon: faLaptop }
      ]
    },
    {
      to: "/grocery",
      label: "Grocery",
      icon: faShoppingBasket,
      subcategories: [
        { to: "/vegetables", label: "Vegetables", icon: faShoppingBasket },
        { to: "/fruits", label: "Fruits", icon: faShoppingBasket },
        { to: "/dairy", label: "Dairy Products", icon: faShoppingBasket },
        { to: "/beverages", label: "Beverages", icon: faShoppingBasket }
      ]
    },
    {
      to: "/food",
      label: "Food",
      icon: faUtensils,
      subcategories: [
        { to: "/snacks", label: "Snacks", icon: faUtensils },
        { to: "/frozen", label: "Frozen Food", icon: faUtensils },
        { to: "/readytoeat", label: "Ready to Eat", icon: faUtensils },
        { to: "/sweets", label: "Sweets", icon: faUtensils }
      ]
    },
    {
      to: "/fashion",
      label: "Fashion",
      icon: faTshirt,
      subcategories: [
        { to: "/men", label: "Men", icon: faTshirt },
        { to: "/women", label: "Women", icon: faTshirt },
        { to: "/kids", label: "Kids", icon: faTshirt },
        { to: "/accessories", label: "Accessories", icon: faTshirt }
      ]
    },
    {
      to: "/Home&Kitche",
      label: "Home&Kitchen",
      icon: faUtensils,
      subcategories: [
        { to: "/cookware", label: "Cookware", icon: faUtensils },
        { to: "/serveware", label: "Serveware", icon: faUtensils },
        { to: "/storage", label: "Storage", icon: faUtensils },
        { to: "/cleaning", label: "Cleaning Tools", icon: faUtensils }
      ]
    },
    {
      to: "/beauty-personal-care",
      label: "Beauty&Personal Care",
      icon: faStar,
      subcategories: [
        { to: "/skincare", label: "Skincare", icon: faStar },
        { to: "/haircare", label: "Hair Care", icon: faStar },
        { to: "/fragrances", label: "Fragrances", icon: faStar },
        { to: "/personal-hygiene", label: "Personal Hygiene", icon: faStar }
      ]
    },
    {
      to: "/sports-fitness",
      label: "Sports&Fitness",
      icon: faDumbbell,
      subcategories: [
        { to: "/gym-equipment", label: "Gym Equipment", icon: faDumbbell },
        { to: "/outdoor-sports", label: "Outdoor Sports", icon: faDumbbell },
        { to: "/sportswear", label: "SportWear", icon: faDumbbell },
        { to: "/fitness-accessories", label: "Fitness Accessories", icon: faDumbbell }
      ]
    }
  ];




  //check login status
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location]);

  const iconLinks = [
    { to: "/customer/cart", icon: faShoppingCart, title: "Cart" },
    { to: "/customer/myorders", icon: faTruck, title: "My Orders" },
    { to: "/Home", icon: faHouse, title: "Home" },
    { to: "/seller/BussinessRegister", icon: faStore, title: "Seller" },
    { to: "/Login", icon: faUser, title: "Customer" },

  ];
  if (isLoggedIn) {
    iconLinks.push({
      to: "/logout",
      icon: faRightFromBracket,
      title: "Logout",
    });
  }



  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowCategoryNav(currentScrollY <= lastScrollY || currentScrollY < 70);
      setLastScrollY(currentScrollY);
      if (isIconMenuOpen && currentScrollY > lastScrollY) {
        setIsIconMenuOpen(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isIconMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = document.getElementById("sidebar");
      if (
        showSidebar &&
        sidebar &&
        !sidebar.contains(event.target) &&
        !event.target.classList.contains("sidebar-toggle")
      ) {
        setShowSidebar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showSidebar]);

  return (
    <>
      <style>
        {`
          .nav-link .fa-lg:hover {
            color: yellow;
          }
        `}
      </style>

      {/* Top Navbar */}
      <nav
        className="navbar navbar-expand-lg"
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 1000,
          backgroundImage:
            "linear-gradient(to right, rgba(255, 252, 252, 1), black, rgb(0, 0, 0), black)",
          padding: "10px",
        }}
      >
        <div className="container-fluid">
          {/* Mobile View */}
          <div className="d-flex justify-content-between align-items-center w-100 d-lg-none">
            <Link to="/" className="navbar-brand">
              <img
                src="src\images\Digital_StoreLogo.png"
                alt="Logo"
                style={{ height: "40px" }}
              />
            </Link>
            <button
              className="btn btn-outline-light"
              onClick={() => setIsIconMenuOpen(!isIconMenuOpen)}
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>

          {/* Desktop View */}
          <div className="d-none d-lg-flex justify-content-between align-items-center w-100">
            <Link to="/" className="navbar-brand me-3">
              <img
                src="src\images\Digital_StoreLogo.png"
                alt="Logo"
                style={{ height: "50px", width: "50px" }}
              />
            </Link>

            <form className="d-flex align-items-center w-50 position-relative mx-2">
              <input
                className="form-control rounded-pill ps-4 pe-5"
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                className="btn position-absolute end-0 me-2 text-secondary"
                type="submit"
                style={{ background: "none", border: "none" }}
              >
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </form>

            <ul className="navbar-nav d-flex flex-row ms-3">
              {iconLinks.map(({ to, icon, title }, index) => (
                <li key={index} className="nav-item mx-2">
                  <Link
                    to={to}
                    className={`nav-link text-white d-flex flex-column align-items-center justify-content-center ${location.pathname === to ? "fw-bold text-warning" : ""
                      }`}
                    style={{ fontSize: "0.8rem", minWidth: "60px", minHeight: "60px" }}
                  >
                    <FontAwesomeIcon icon={icon} className="fa-lg" />
                    <span className="mt-1">{title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      {/* Mobile Search */}
      <div
        className="d-lg-none"
        style={{
          position: "fixed",
          top: "60px",
          width: "100%",
          zIndex: 999,
          backgroundImage:
            "linear-gradient(to right, rgb(85, 82, 82), black, rgb(206, 200, 200), black)",
          padding: "10px",
        }}
      >
        <form className="d-flex align-items-center w-100 position-relative">
          <input
            className="form-control rounded-pill ps-4 pe-5"
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="btn position-absolute end-0 me-2 text-secondary"
            type="submit"
            style={{ background: "none", border: "none" }}
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>
      </div>

      {/* Mobile Icon Menu */}
      {isIconMenuOpen && (
        <div
          className="bg-dark rounded p-2 position-fixed d-lg-none"
          style={{
            top: "110px",
            right: "10px",
            zIndex: 1001,
          }}
        >
          {iconLinks.map(({ to, icon, title }, index) => (
            <Link
              key={index}
              to={to}
              className={`d-flex align-items-center text-white py-2 px-3 ${location.pathname === to ? "fw-bold text-warning" : ""
                }`}
              onClick={() => setIsIconMenuOpen(false)}
            >
              <FontAwesomeIcon icon={icon} className="me-2" />
              {title}
            </Link>
          ))}
        </div>
      )}

      {/* Desktop Category Nav */}
      <nav
        className="navbar navbar-expand-lg d-none d-lg-block"
        style={{
          position: "fixed",
          top: "70px",
          width: "100%",
          zIndex: 900,
          backgroundColor: "rgb(71, 114, 199)",
          padding: "10px",
          transition: "transform 0.3s ease-in-out",
          transform: showCategoryNav ? "translateY(0)" : "translateY(-100%)",
        }}
      >
        <div className="container-fluid">
          <div className="d-flex justify-content-between align-items-center w-100">
            <button
              className="btn btn-outline-light sidebar-toggle me-3"
              onClick={() => setShowSidebar(!showSidebar)}
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
            <ul className="navbar-nav me-auto">
              {categories.map((Category, index) => (
                <li
                  key={index}
                  className="nav-item position-relative"
                  onMouseEnter={() => Category.subcategories ? setHoveredCategory(index) : null
                  }
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  <span className="nav-link text-white px-3" style={{ cursor: "pointer" }}>
                    {Category.label}
                  </span>

                  {/* Dropdown for Subcategories */}
                  {Category.subcategories && hoveredCategory === index && (
                    <ul
                      className="dropdown-menu show"
                      style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        backgroundColor: "#fff",
                        padding: "10px",
                        boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
                        borderRadius: "5px",
                        zIndex: 1000,
                        minWidth: "200px"
                      }}
                    >
                      {Category.subcategories.map((sub, subIdx) => (
                        <li key={subIdx}>
                          <Link
                            to={sub.to}
                            className="dropdown-item"
                            onClick={() => setExpandedCategory(null)}
                          >
                            {sub.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>


      {/* Mobile Category Nav */}
      <nav
        className="navbar d-lg-none"
        style={{
          position: "fixed",
          top: "110px",
          width: "100%",
          zIndex: 900,
          backgroundColor: "rgb(71, 114, 199)",
          overflowX: "auto",
          whiteSpace: "nowrap",
          padding: "10px",
          transition: "transform 0.3s ease-in-out",
          transform: showCategoryNav ? "translateY(0)" : "translateY(-100%)",
        }}
      >
        <div className="d-flex justify-content-start align-items-center w-100">
          <button
            className="btn btn-outline-light sidebar-toggle me-3"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
          <div
            className="d-flex flex-nowrap ms-2"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              maxWidth: "85%",
            }}
          >
            {categories.map(({ to, label }, index) => (
              <Link
                key={index}
                to={to}
                className="btn btn-outline-light mx-2 mt-2"
                style={{ whiteSpace: "nowrap" }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <div
        id="sidebar"
        className={`position-fixed bg-white ${showSidebar ? "show" : ""}`}
        style={{
          top: 0,
          left: showSidebar ? 0 : "-300px",
          width: "300px",
          height: "100vh",
          zIndex: 1500,
          transition: "left 0.3s ease-in-out",
          boxShadow: showSidebar ? "5px 0 15px rgba(0,0,0,0.2)" : "none",
          overflowY: "auto",
          paddingTop: "20px",
        }}
      >
        <div className="d-flex justify-content-between align-items-center px-4 mb-4">
          <h5 className="m-0 text-dark">Menu</h5>
          <button
            className="btn btn-outline-dark"
            onClick={() => setShowSidebar(false)}
          >
            <FontAwesomeIcon icon={faClose} />
          </button>
        </div>
        <div className="px-4">
          <h6 className="text-dark mb-3 fw-bold">Categories</h6>
          {categories.map(({ to, label }, index) => (
            <Link
              key={index}
              to={to}
              className="d-block text-dark py-2 text-decoration-none border-bottom"
              onClick={() => setShowSidebar(false)}
            >
              {label}
            </Link>
          ))}

          <h6 className="text-dark mb-3 mt-4 fw-bold">Quick Links</h6>
          {iconLinks.map(({ to, icon, title }, index) => (
            <Link
              key={index}
              to={to}
              className="d-block text-dark py-2 text-decoration-none border-bottom"
              onClick={() => setShowSidebar(false)}
            >
              <FontAwesomeIcon icon={icon} className="me-3" />
              {title}
            </Link>
          ))}
        </div>
      </div>

      {/* Overlay for Sidebar */}
      {showSidebar && (
        <div
          className="position-fixed top-0 left-0 w-100 h-100"
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 1400,
          }}
          onClick={() => setShowSidebar(false)}
        ></div>
      )}

      {/* Spacers for layout */}
      <div className="d-lg-none" style={{ height: "180px" }}></div>
      <div className="d-none d-lg-block" style={{ height: "130px" }}></div>
    </>
  );
}

export default Header; 