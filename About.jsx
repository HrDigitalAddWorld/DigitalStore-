import React from "react";

const About = () => {
  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">About Us</h2>
      <div className="row">
        <div className="col-md-6">
          <img
            src="https://img.freepik.com/free-vector/ecommerce-concept-illustration_114360-8243.jpg"
            alt="About Us"
            className="img-fluid rounded shadow"
          />
        </div>
        <div className="col-md-6">
          <p>
            <strong>Digital Store</strong> is your one-stop solution for all digital products.
            We provide the best deals on software, tools, electronics, fashion, and more. 
            Our mission is to make technology and products more accessible and affordable 
            to everyone, everywhere.
          </p>
          <p>
            We value quality, customer satisfaction, and innovation. Our platform connects buyers and sellers 
            while ensuring secure transactions and timely delivery. Whether you're a tech enthusiast or 
            just looking for reliable products online, Digital Store is here to serve you.
          </p>
          <p><strong>Go Green, Go Digital.</strong></p>
        </div>
      </div>
    </div>
  );
};

export default About;
