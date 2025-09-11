
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";

export default function TotalNav() {
    const navigate = useNavigate();
    const location = useLocation();
    const [search, setSearch] = useState(location.state?.search || "");
    const [loading, setLoading] = useState(false);

    // Simulate loading for demonstration (remove in production)
    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => setLoading(false), 1200);
        return () => clearTimeout(timer);
    }, [search]);

    // Update search bar if navigation state changes (e.g., on page reload or navigation)
    useEffect(() => {
        if (location.state?.search !== undefined) {
            setSearch(location.state.search);
        }
    }, [location.state?.search]);

    // Navigate to /products with search state on every input change
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearch(value);
        navigate("/products", { state: { search: value } });
    };

    return (
        <header style={styles.header}>
            <div style={styles.logoContainer}>
                <img
                    src="https://cdn-icons-png.flaticon.com/512/263/263142.png"
                    alt="Shopcart Logo"
                    style={styles.logoImage}
                />
                <span style={styles.logoText}>Shopcart</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexGrow: 1 }}>
                <div style={styles.searchContainer}>
                    <div style={{ position: 'relative', width: '100%' }}>
                        <input
                            type="search"
                            placeholder="Search Product"
                            style={{ ...styles.searchInput, paddingRight: 38 }}
                            value={search}
                            onChange={handleSearchChange}
                            disabled={loading}
                        />
                        <span style={{
                            position: 'absolute',
                            right: 10,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            pointerEvents: 'none',
                            display: 'flex',
                            alignItems: 'center',
                        }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="11" cy="11" r="7" stroke="#265235" strokeWidth="2" fill="#e9f5e1" />
                                <line x1="16.4142" y1="16" x2="21" y2="20.5858" stroke="#265235" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </span>
                        {loading && (
                            <div style={spinnerOverlayStyle}>
                                <div className="spinner-pro" style={spinnerStyle}></div>
                            </div>
                        )}
                    </div>
                </div>
                <Navbar />
            </div>
            <style>{`
                .spinner-pro {
                  border: 4px solid #e0ffe7;
                  border-top: 4px solid #43e97b;
                  border-radius: 50%;
                  width: 36px;
                  height: 36px;
                  animation: spin 1s linear infinite;
                }
                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
            `}</style>
        </header>
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

const styles = {
    header: {
        display: 'flex',
        alignItems: 'center',
        padding: '10px 30px',
        borderBottom: '1px solid #bae2f5ff',
        gap: '2rem',
        flexWrap: 'wrap',
    },
    logoContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    },
    logoImage: {
        width: 30,
        height: 30,
    },
    logoText: {
        fontWeight: 'bold',
        fontSize: '1.2rem',
        color: '#265235',
    },
    searchContainer: {
        display: 'flex',
        alignItems: 'center',
        flexGrow: 1,
        maxWidth: 300,
    },
    searchInput: {
        width: '100%',
        padding: '6px 10px',
        borderRadius: 20,
        border: '1px solid #ccc',
        outline: 'none',
    }
};