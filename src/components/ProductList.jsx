import React, { useState, useMemo } from "react";
import ProductCard from "./ProductCard";

export default function ProductList({ products, onDeleteProduct }) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [category, setCategory] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  const categories = useMemo(
    () => [...new Set(products.map((p) => p.category))],
    [products]
  );

  const filtered = useMemo(() => {
    let filtered = [...products];
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
    return filtered;
  }, [products, search, sort, category]);

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/products/${id}`, { method: "DELETE" });
    onDeleteProduct(id);
    setDeleteId(null);
  };

  if (products.length === 0) {
    return (
      <div className="empty-state">
        <h3>📦 No products found</h3>
        <p>Add your first product using the form above.</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
      <div
        style={{
          display: "flex",
          gap: 16,
          marginBottom: 24,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        
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
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 24,
          justifyContent: "flex-start",
        }}
      >
        {filtered.map((product) => (
          <div key={product._id} style={glassCard()}>
            <div
              style={{
                fontWeight: 600,
                color: "#265235",
                marginBottom: 8,
              }}
            >
              {product.name}
            </div>
            <div
              style={{
                color: "#265235cc",
                marginBottom: 8,
              }}
            >
              {product.category}
            </div>
            <div
              style={{
                color: "#265235",
                fontWeight: 700,
                marginBottom: 12,
              }}
            >
              ${product.price}
            </div>
            <button
              onClick={() => setDeleteId(product._id)}
              style={deleteBtnStyle}
            >
              Delete
            </button>
            {deleteId === product._id && (
              <div style={overlayStyle}>
                <div style={{ marginBottom: 16 }}>
                  Are you sure you want to delete?
                </div>
                <div>
                  <button
                    onClick={() => handleDelete(product._id)}
                    style={confirmBtnStyle}
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setDeleteId(null)}
                    style={cancelBtnStyle}
                  >
                    No
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function glassCard() {
  return {
    background: "rgba(255,255,255,0.6)",
    borderRadius: 24,
    boxShadow: "0 4px 24px rgba(38,82,53,0.10)",
    padding: 24,
    margin: 12,
    minWidth: 220,
    maxWidth: 260,
    backdropFilter: "blur(8px)",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };
}

const inputStyle = {
  padding: "8px 16px",
  borderRadius: 16,
  border: "1px solid #b7e4c7",
  fontSize: "1rem",
  outline: "none",
  minWidth: 140,
};

const deleteBtnStyle = {
  background: "#265235",
  color: "#fff",
  border: "none",
  borderRadius: 16,
  padding: "6px 18px",
  cursor: "pointer",
  fontWeight: 600,
  marginTop: 8,
};

const overlayStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(38,82,53,0.85)",
  color: "#fff",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 24,
  zIndex: 2,
};

const confirmBtnStyle = {
  background: "#b7e4c7",
  color: "#265235",
  border: "none",
  borderRadius: 16,
  padding: "6px 18px",
  fontWeight: 600,
  marginRight: 12,
  cursor: "pointer",
};

const cancelBtnStyle = {
  background: "#fff",
  color: "#265235",
  border: "none",
  borderRadius: 16,
  padding: "6px 18px",
  fontWeight: 600,
  cursor: "pointer",
};