import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { ContextApi } from "./Component/common/Context_Api";
import ProtectedRoute from "./Component/common/ProtectedRoute";

import Header from "./Component/common/Header";
import Footer from "./Component/common/Footer";
import Login from "./Component/auth/Login";
import ForgotResetPassword from "./Component/auth/ForgotResetPassword";
import Logout from "./Component/auth/Logout";

import Home from "./Component/common/Home";
import Shop from "./Component/Customer/Shop";
import About from "./Component/Navbar/About";
import Contact from "./Component/Customer/Contact";

import FAQs from "./Component/support/FAQs";
import ReturnPolicy from "./Component/support/ReturnPolicy";
import ShippingInfo from "./Component/support/ShippingInfo";
import TermsCondition from "./Component/support/TermsCondition";

import MobilesSummerypage from "./Component/Navbar/MobilesSummerypage";
import TvSummery from "./Component/Navbar/TvSummery";
import Smartwatchform from "./Component/Navbar/SmartWacthform";
import Laptops from "./Component/Navbar/Laptops";
import Books from "./Component/Navbar/Books";
import Fashion from "./Component/Navbar/Fashion";
import Computer from "./Component/Navbar/Computer";
import Electronic from "./Component/Navbar/Electronic";

import AdminRoutes from "./Component/AdminRoutes";
import CustomerRoutes from "./Component/CustomerRoutes";
import SellerRoutes from "./Component/SellerRoutes";
import SeeMore from "./Component/common/SeeMore";
import ProductDetails from "./Component/common/ProductDetails";
import AllProductList from "./Component/common/AllProductList";
import CustomerCreateAccount from "./Component/Customer/CustomerCreateAccount";
import BussinessRegister from "./Component/Seller/BussinessRegister";
import Cart from "./Component/Customer/Cart";
import CheckoutSection from "./Component/Customer/CheckoutSection";

// ✅ Layout moved to its own function below Router
const Layout = ({ children }) => {
  const location = useLocation();
  const showLayoutPaths = ["/", "/shop", "/about", "/contact"];
  const isProductDetails = location.pathname.startsWith("/product");

  const showLayout = showLayoutPaths.includes(location.pathname) || isProductDetails;

  return (
    <>
      {showLayout && <Header />}
      <main>{children}</main>
      {showLayout && <Footer />}
    </>
  );
};

function App() {
  const [cart, setCart] = useState("");
  const [loginname, setLoginName] = useState(localStorage.getItem("loginname"));
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <Router> {/* ✅ Move Router to outermost layer */}
      <ContextApi.Provider value={{ loginname, setLoginName, cart, setCart, token, setToken }}>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/About" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product/:productId" element={<ProductDetails />} />
            <Route path="/see-more/:category" element={<SeeMore />} />
            <Route path="/CustomerAccount" element={<CustomerCreateAccount />} />
            <Route path="/seller/BussinessRegister" element={<BussinessRegister />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/ForgotPassword" element={<ForgotResetPassword />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<CheckoutSection />} />
            <Route path="/logout" element={<Logout />} />
          

            {/* Admin Routes */}
            <Route path="/admin/*" element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route path="*" element={<AdminRoutes />} />
            </Route>
    
            {/* Seller Routes */}
            <Route path="/seller/*" element={<ProtectedRoute allowedRoles={['seller']} />}>
              <Route path="*" element={<SellerRoutes />} />
            </Route>

            {/* Customer Routes */}
            <Route path="/customer/*" element={<ProtectedRoute allowedRoles={['customer']} />}>
              <Route path="*" element={<CustomerRoutes />} />
            </Route>

            {/* Product Categories */}
            <Route path="/Mobile" element={<ProtectedRoute allowedRoles={['admin', 'customer']} />}>
              <Route index element={<MobilesSummerypage />} />
            </Route>

            <Route path="/Tv" element={<ProtectedRoute allowedRoles={['admin', 'customer']} />}>
              <Route index element={<TvSummery />} />
            </Route>

            <Route path="/SmartWatch" element={<ProtectedRoute allowedRoles={['admin', 'customer']} />}>
              <Route index element={<Smartwatchform />} />
            </Route>

            <Route path="/Laptop" element={<ProtectedRoute allowedRoles={['admin', 'customer']} />}>
              <Route index element={<Laptops />} />
            </Route>

            <Route path="/Books" element={<ProtectedRoute allowedRoles={['admin', 'customer']} />}>
              <Route index element={<Books />} />
            </Route>

            <Route path="/fashion" element={<ProtectedRoute allowedRoles={['admin', 'customer']} />}>
              <Route index element={<Fashion />} />
            </Route>

            <Route path="/Computer" element={<ProtectedRoute allowedRoles={['admin', 'customer']} />}>
              <Route index element={<Computer />} />
            </Route>

            <Route path="/electronic" element={<ProtectedRoute allowedRoles={['admin', 'customer']} />}>
              <Route index element={<Electronic />} />
            </Route>

            
             {/* support Categories */}
            <Route path="/faq" element={<FAQs />} />
            <Route path="/returns" element={<ReturnPolicy />} />
            <Route path="/shipping" element={<ShippingInfo />} />
            <Route path="/terms" element={<TermsCondition />} />            
          </Routes>
        </Layout>
      </ContextApi.Provider>
    </Router>
  );
}

export default App;
