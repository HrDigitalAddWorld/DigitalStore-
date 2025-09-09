// import React, { useState, useEffect } from "react";

// const MobilesSummaryPage = () => {
//   const [mobiles, setMobiles] = useState([]);
//   const [selectedBrand, setSelectedBrand] = useState("All");
//   const [brands, setBrands] = useState(["All"]);

//   useEffect(() => {
//     fetch("https://api.example.com/mobiles") // Replace with actual API endpoint
//       .then(response => response.json())
//       .then(data => {
//         setMobiles(data);
//         setBrands(["All", ...new Set(data.map(mobile => mobile.brand))]);
//       })
//       .catch(error => console.error("Error fetching data:", error));
//   }, []);

//   const filteredMobiles = selectedBrand === "All" ? mobiles : mobiles.filter(mobile => mobile.brand === selectedBrand);

//   return (
//     <div style={{ padding: "10px" }}>
//       <div style={{ marginBottom: "10px" }}>
//         {brands.map((brand, index) => (
//           <button
//             key={index}
//             onClick={() => setSelectedBrand(brand)}
//             style={{ marginRight: "5px", padding: "5px", border: "1px solid #ccc", cursor: "pointer" }}>
//             {brand}
//           </button>
//         ))}
//       </div>
//       <div style={{ display: "grid", gap: "10px" }}>
//         {filteredMobiles.map((mobile, index) => (
//           <div key={index} style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "5px" }}>
//             <h2>{mobile.name}</h2>
//             <p>Brand: {mobile.brand}</p>
//             <p>Price: {mobile.price}</p>
//             <p>{mobile.specs}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MobilesSummaryPage;

import React, { useState, useEffect } from "react";

const MobilesSummaryPage = () => {
  const [mobiles, setMobiles] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [brands, setBrands] = useState(["All"]);

  useEffect(() => {
    fetch("http://localhost:5000/api/mobiles") // Replace with your real API
      .then(response => response.json())
      .then(data => {
        setMobiles(data);
        setBrands(["All", ...new Set(data.map(mobile => mobile.brand))]);
      })
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  const filteredMobiles =
    selectedBrand === "All"
      ? mobiles
      : mobiles.filter(mobile => mobile.brand === selectedBrand);

  return (
    <div style={{ padding: "20px" }}>
      {/* Filter buttons */}
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        {brands.map((brand, index) => (
          <button
            key={index}
            onClick={() => setSelectedBrand(brand)}
            style={{
              margin: "0 10px 10px 0",
              padding: "8px 16px",
              borderRadius: "5px",
              border: selectedBrand === brand ? "2px solid blue" : "1px solid #ccc",
              backgroundColor: selectedBrand === brand ? "#e0f0ff" : "#f9f9f9",
              cursor: "pointer"
            }}
          >
            {brand}
          </button>
        ))}
      </div>

      {/* Mobile Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px"
        }}
      >
        {filteredMobiles.map((mobile, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              padding: "16px",
              backgroundColor: "#fff",
              transition: "transform 0.2s",
            }}
          >
            {
              mobile.image && (
                <img
                  src={mobile.image}
                  alt={mobile.name}
                  style={{width:"100%", height:"180px", objectFit:"cover", borderRadius:"8px"}}
              ></img>)
            }
            <h3 style={{ color: "#333" }}>{mobile.name}</h3>
            <p><strong>Brand:</strong> {mobile.brand}</p>
            <p><strong>Price:</strong> ₹{mobile.price}</p>
            <p style={{ fontSize: "14px", color: "#666" }}>{mobile.specs}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobilesSummaryPage;
