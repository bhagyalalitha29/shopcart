import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";

export default function TotalNav() {
    const navigate = useNavigate();
    const location = useLocation();
    const [search, setSearch] = useState(location.state?.search || "");

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
                <Navbar />
                <div style={styles.searchContainer}>
                    <input
                        type="search"
                        placeholder="Search Product"
                        style={styles.searchInput}
                        value={search}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>
        </header>
    );
}

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