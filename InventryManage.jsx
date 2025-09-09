import React, { useEffect, useState } from "react";
import axios from "axios";
import LeftSideBar from "./Partials/LeftSideBar";
import SellerHeader from "./Partials/SellerHeader";
import SellerHead from "./Partials/SellerHead";

const InventryManage = ({ children }) => {
  const [products, setProducts] = useState([]);

  const fetchInventory = async () => {
    try {
      const res = await axios.get("/api/seller/products"); // Replace with your actual API
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const getSummary = () => {
    const total = products.length;
    const inStock = products.filter((p) => p.stock > 0).length;
    const outOfStock = products.filter((p) => p.stock === 0).length;
    return { total, inStock, outOfStock };
  };

  const { total, inStock, outOfStock } = getSummary();

  return (
    <>
      <SellerHead />
      <SellerHeader />

      <section id="mid">
        <div className="container-fluid">
          <div className="row">
            <LeftSideBar />
            <div className="col-md-9">
              <h2 className="text-center">INVENTORY MANAGEMENT</h2>

              {/* Inventory Summary */}
              <div className="row text-center my-4">
                <div className="col-md-4">
                  <div className="card shadow p-3">
                    <h5>Total Products</h5>
                    <h3 className="text-primary">{total}</h3>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card shadow p-3">
                    <h5>In Stock</h5>
                    <h3 className="text-success">{inStock}</h3>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card shadow p-3">
                    <h5>Out of Stock</h5>
                    <h3 className="text-danger">{outOfStock}</h3>
                  </div>
                </div>
              </div>

              {/* Product List Table */}
              <div className="card shadow p-3 mt-4">
                <h5 className="mb-3">Product Inventory</h5>
                <table className="table table-bordered table-striped">
                  <thead className="thead-dark">
                    <tr>
                      <th>#</th>
                      <th>Product Name</th>
                      <th>Category</th>
                      <th>Stock</th>
                      <th>Price</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product, index) => {
                      let status = "Out of Stock";
                      let badge = "danger";

                      if (product.stock > 10) {
                        status = "In Stock";
                        badge = "success";
                      } else if (product.stock > 0) {
                        status = "Low Stock";
                        badge = "warning";
                      }

                      return (
                        <tr key={product._id || index}>
                          <td>{index + 1}</td>
                          <td>{product.name}</td>
                          <td>{product.category}</td>
                          <td>{product.stock}</td>
                          <td>${product.price}</td>
                          <td><span className={`badge bg-${badge}`}>{status}</span></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {children}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default InventryManage;
