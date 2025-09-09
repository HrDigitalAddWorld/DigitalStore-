import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";

function ProductDetails() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/api/products/${productId}`);
        const fetchedProduct = res.data.product;
        setProduct(fetchedProduct);

        if (fetchedProduct.images?.length) {
          setMainImage(fetchedProduct.images[0]);
        }

        const relatedRes = await axios.get(`/api/products/active`);
        const allActiveProducts = relatedRes.data.products || [];

        const filtered = allActiveProducts.filter(
          (p) => p._id !== productId
        );

        setRelatedProducts(filtered);
      } catch (err) {
        console.error("Error fetching product or related products:", err);
      }
    };
    fetchProduct();
  }, [productId]);

  const changeImage = (index) => {
    setMainImage(product.images[index]);
    setActiveIndex(index);
  };

  const handleAddToCart = async () => {
  try {
    const token = localStorage.getItem("token"); // assuming you store JWT token
    const userId = localStorage.getItem("userId"); // store userId when login

    const payload = {
      userId: userId,
      productId: product._id,
      quantity: 1,
    };

    // Call backend API
    const response = await axios.post(
      "http://localhost:5000/api/cart/add",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.success) {
      alert("Product added to cart!");

      // Optional: update localStorage to keep frontend in sync
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existingIndex = cart.findIndex((item) => item._id === product._id);

      if (existingIndex >= 0) {
        cart[existingIndex].quantity += 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      alert("Failed to add product to cart.");
    }
  } catch (error) {
    console.error("Error adding to cart:", error);
    alert("Something went wrong. Please try again.");
  }
};

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/cart");
  };

  if (!product) {
    return <div className="text-center p-5">Loading product details...</div>;
  }

  return (
    <>
      <Header />

      <div className="container my-4">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/">Home</a></li>
            <li className="breadcrumb-item"><a href={`/category/${product.category}`}>{product.category}</a></li>
            <li className="breadcrumb-item active" aria-current="page">{product.name}</li>
          </ol>
        </nav>

        <div className="row g-4">
          <div className="col-md-5 ">
            <div className="mb-3  ">
              {product.images?.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  className={`img-thumbnail me-2 mb-2 ${activeIndex === index ? "border-primary" : ""}`}
                  style={{ width: "60px", height: "60px", cursor: "pointer" }}
                  onClick={() => changeImage(index)}
                  alt=""
                />
              ))}
            </div>
            <div className="position-relative ">
              <img
                src={mainImage || "/default-product.jpg"}
                alt="Main"
                className="img-fluid rounded shadow-sm "
              />
              {product.discount > 0 && (
                <span className="badge bg-danger position-absolute top-0 end-0 m-2">{product.discount}% OFF</span>
              )}
            </div>
          </div>

          <div className="col-md-7">
            <h2>{product.name}</h2>
            <p className="text-muted">Brand: <strong>{product.brand}</strong></p>

            <div className="mb-2 text-warning" style={{ fontSize: "1.2rem" }}>
              {"★".repeat(4)}{"☆"}{" "}
              <span className="ms-2 text-muted">{product.ratingsCount || 0} ratings</span>
            </div>

            <h4 className="text-success">₹{product.price}</h4>
            {product.compareAtPrice && (
              <div>
                <span className="text-muted text-decoration-line-through">₹{product.compareAtPrice}</span>
                <span className="text-danger ms-2">Save ₹{product.compareAtPrice - product.price}</span>
              </div>
            )}

            <div className="mt-3">
              <p><strong>Description:</strong></p>
              <p>{product.description || "No description available."}</p>
            </div>

            {product.colorOptions?.length > 0 && (
              <div className="mt-3">
                <p><strong>Color:</strong> {product.selectedColor}</p>
                <div className="d-flex gap-2">
                  {product.colorOptions.map((color, i) => (
                    <div
                      key={i}
                      className={`rounded-circle p-3 border ${color === product.selectedColor ? "border-primary" : ""}`}
                      style={{ backgroundColor: color, cursor: "pointer" }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            )}

            {product.storageOptions?.length > 0 && (
              <div className="mt-3">
                <p><strong>Storage:</strong> {product.selectedStorage}</p>
                <div className="d-flex gap-2 flex-wrap">
                  {product.storageOptions.map((option, i) => (
                    <button key={i} className={`btn btn-sm ${option === product.selectedStorage ? "btn-primary" : "btn-outline-secondary"}`}>
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-4 d-grid gap-2">
              <button className="btn btn-warning" onClick={handleAddToCart}>
                <i className="bi bi-cart-plus me-2"></i>Add to Cart
              </button>
              <button className="btn btn-success" onClick={handleBuyNow}>
                <i className="bi bi-lightning me-2"></i>Buy Now
              </button>
            </div>

            <div className="mt-3">
              {product.inStock ? (
                <p className="text-success"><i className="bi bi-check-circle me-1"></i> In Stock</p>
              ) : (
                <p className="text-danger"><i className="bi bi-x-circle me-1"></i> Out of Stock</p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-5">
          <h4>Specifications</h4>
          <table className="table table-bordered">
            <tbody>
              {product.specifications?.length > 0 ? product.specifications.map((spec, index) => (
                <tr key={index}>
                  <th>{spec.name}</th>
                  <td>{spec.value}</td>
                </tr>
              )) : (
                <tr><td colSpan="2">No specifications available</td></tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-5">
          <h4>Related Products</h4>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3">
            {relatedProducts.length > 0 ? relatedProducts.map((relatedProduct, index) => (
              <div key={index} className="col">
                <div className="card h-100 border shadow-sm">
                  <img src={relatedProduct.images || "/default-product.jpg"} className="card-img-top" alt={relatedProduct.name} style={{ height: "160px", objectFit: "contain" }} />
                  <div className="card-body">
                    <h6 className="card-title text-truncate">{relatedProduct.name}</h6>
                    <p className="text-success fw-bold">₹{relatedProduct.price}</p>
                    {relatedProduct.discount > 0 && (
                      <span className="badge bg-danger">{relatedProduct.discount}% OFF</span>
                    )}
                  </div>
                  <div className="card-footer bg-white border-top-0">
                    <a href={`/product/${relatedProduct._id}`} className="btn btn-outline-primary btn-sm w-100">View Details</a>
                  </div>
                </div>
              </div>
            )) : (
              <div className="col-12 text-muted">No related products found.</div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ProductDetails;
