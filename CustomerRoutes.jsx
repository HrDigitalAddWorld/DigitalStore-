import React from "react";
import { Route, Routes } from "react-router-dom";

import Cart from "./Customer/Cart";
import CheckoutSection from "./Customer/CheckoutSection";
import MyOrders from "./Customer/MyOrders";





const CustomerRoutes = () => {
  return (
    <Routes>
     
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/myorders" element={<MyOrders/>}/>
      <Route path="/checkout" element={<CheckoutSection/>}/>
     
    </Routes>
    
  );
};


export default CustomerRoutes;