import React, { useState, useMemo } from "react";
import ProductCard from "./ProductCard";
import "../animations.css";

export default function ProductList({ products, onDeleteProduct, onEditProduct, loading }) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [category, setCategory] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [error, setError] = useState("");

  const categories = useMemo(
    () => [...new Set(products.map((p) => p.category))],
    [products]
  );

  const filtered = useMemo(() => {
    let filtered = [...products];
    try {
      if (search)
        filtered = filtered.filter((p) =>
          p.name.toLowerCase().includes(search.toLowerCase())
        );
      if (category) filtered = filtered.filter((p) => p.category === category);
      if (sort === "low") filtered.sort((a, b) => a.price - b.price);
      if (sort === "high") filtered.sort((a, b) => b.price - a.price);
      if (sort === "alpha")
        filtered.sort((a, b) => a.name.localeCompare(b.name));
      if (sort === "newest") filtered.sort((a, b) => b._id.localeCompare(a._id));
      if (sort === "oldest") filtered.sort((a, b) => a._id.localeCompare(b._id));
    } catch (e) {
      setError("Error filtering products");
    }
    return filtered;
  }, [products, search, sort, category]);

  const handleDelete = async (id) => {
    try {
      await fetch(`https://shopcart-paisawapas.onrender.com/api/products/${id}`, { method: "DELETE" });
      onDeleteProduct(id);
      setDeleteId(null);
    } catch (e) {
      setError("Error deleting product");
    }
  };


  if (loading) {
    return (
      <div style={spinnerOverlayStyle}>
        <div className="spinner-pro" style={spinnerStyle}></div>
        <style>{`
          .spinner-pro {
            border: 4px solid #e0ffe7;
            border-top: 4px solid #43e97b;
            border-radius: 50%;
            width: 48px;
            height: 48px;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div className="empty-state fadeInUp" style={{color: 'red', textAlign: 'center', margin: 40}}>
        <h3>⚠️ {error}</h3>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="empty-state fadeInUp">
        <h3>📦 No products found</h3>
        <p>Add your first product using the form above.</p>
      </div>
    );
  }
const spinnerOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  background: 'rgba(255,255,255,0.7)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 2000,
};

const spinnerStyle = {
  display: 'block',
  margin: '0 auto',
};

  return (
    <div>
      <div style={selectBar}>
        <div style={{position:'relative',display:'inline-block'}}>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={inputStyle}
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          {/* Filter icon */}
          <span style={{position:'absolute',right:12,top:'50%',transform:'translateY(-50%)',pointerEvents:'none',margin:'5px 5px 0 10px'}}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 5h18M6 10h12M9 15h6" stroke="#265235" strokeWidth="2" strokeLinecap="round"/></svg>
          </span>
        </div>
        <div style={{position:'relative',display:'inline-block'}}>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            style={inputStyle}
          >
            <option value="">Sort By</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
            <option value="alpha">Alphabetical</option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
          {/* Sort icon */}
          <span style={{position:'absolute',right:12,top:'50%',transform:'translateY(-50%)',pointerEvents:'none',paddingRight:'10px'}}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5" stroke="#265235" strokeWidth="2" strokeLinecap="round"/></svg>
          </span>
        </div>
      </div>
      <div
        className="fadeInUp"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))",
          gap: 32,
          width: "100%",
          boxSizing: "border-box",
          minHeight: 300,
          maxHeight: "85vh", // allow scrolling
          overflowY: "auto",
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE/Edge
          padding: "10px 22px 60px 46px", // extra bottom padding
          marginBottom: 40,
        }}
      >
        {filtered.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onDelete={() => handleDelete(product._id)}
            onEdit={(updatedProduct) => onEditProduct && onEditProduct(updatedProduct)}
          />
        ))}
        {/* Extra space below products */}
        <div style={{ gridColumn: '1 / -1', height: 40 }}></div>
      </div>
      <style>{`
        .fadeInUp::-webkit-scrollbar { display: none; }
        select {
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          background: linear-gradient(90deg, #f5fef7 60%, #e0ffe7 100%);
          box-shadow: 0 2px 12px rgba(67,160,71,0.10);
          border: 1.5px solid #b7e4c7;
          border-radius: 18px;
          padding-right: 38px;
          font-size: 1.08rem;
          font-weight: 600;
          color: #265235;
          transition: border 0.2s, box-shadow 0.2s;
          outline: none;
        }
        select:focus {
          border: 1.5px solid #43e97b;
          box-shadow: 0 0 0 2px #b7e4c7;
        }
        select:hover {
          background: linear-gradient(90deg, #e0ffe7 60%, #b7e4c7 100%);
        }
        select option {
          background: #fff;
          color: #265235;
        }
        /* Custom arrow */
        select::-ms-expand { display: none; }
        select {
          background-image: url('data:image/svg+xml;utf8,<svg fill="%2343e97b" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/></svg>');
          background-repeat: no-repeat;
          background-position: right 14px center;
          background-size: 18px 18px;
        }

        /* Responsive: 1 product per row, centered, on mobile */
        @media (max-width: 700px) {
          .fadeInUp {
            grid-template-columns: 1fr !important;
            justify-items: center;
            padding: 10px 4vw 60px 4vw !important;
          }
        }
      `}</style>
    </div>
  );
}

const selectBar = {
  display: "flex",
  gap: 22,
  marginBottom: 28,
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "flex-start",
  background: "rgba(255,255,255,0.75)",
  borderRadius: 22,
  boxShadow: "0 2px 16px rgba(67,160,71,0.08)",
  padding: "18px 32px",
  backdropFilter: "blur(6px)",
};

const inputStyle = {
  padding: "10px 30px",
  borderRadius: 18,
  border: "1.5px solid #b7e4c7",
  fontSize: "1.08rem",
  outline: "none",
  minWidth: 170,
  background: "#f5fef7",
  color: "#265235",
  fontWeight: 600,
  boxShadow: "0 1.5px 8px 0 rgba(67,160,71,0.09)",
  marginRight: 10,
  marginBottom: 0,
  transition: "border 0.2s, box-shadow 0.2s",
};