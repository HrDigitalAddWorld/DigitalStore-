import React from "react";
import Head from "../partials/Head";
import Header from "../partials/Header";
import LeftSidebar from "../partials/LeftSidebar";
import { Outlet } from "react-router-dom";


const AdminLayout = ({ children }) => {
  return (
    <>
      <Head />
      <Header />

      <section id="mid">
        <div className="container-fluid">
          <div className="row">
      
            <LeftSidebar />

          
            <div className="admin-content">
              <Outlet />
           
           
              {children}
            </div>
          </div>
        </div>
        <style>{`
        .admin-content {
          margin-left : 320px;
        }
        
          
      `}</style>
      </section>
    </>
  );
};

export default AdminLayout;
