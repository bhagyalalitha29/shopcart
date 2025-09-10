import { useEffect, useState } from "react";
import AddProductForm from "./components/AddProductForm";
import ProductList from "./components/ProductList";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import TotalNav from "./pages/TotalNav";

export default function App() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const location = useLocation();

    // Extract search from navigation state if present
    const search = location.state?.search || "";

    // Fetch products from API with search
    const fetchProducts = async () => {
        try {
            setLoading(true);
            let url = 'https://shopcart-paisawapas.onrender.com/api/products';
            if (search) {
                url += `?search=${encodeURIComponent(search)}`;
            }
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                setProducts(data);
                setError('');
            } else {
                throw new Error('Failed to fetch products');
            }
        } catch (error) {
            setError('Error loading products. Make sure MongoDB is running.');
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    // Refetch products when search changes or on mount
    useEffect(() => {
        fetchProducts();
        // eslint-disable-next-line
    }, [search]);

    const handleProductAdded = (newProduct) => {
        setProducts(prev => [...prev, newProduct]);
    };

    const handleProductDeleted = (productId) => {
        setProducts(prev => prev.filter(product => product._id !== productId));
    };

    if (loading) {
        return (
            <div className="container">
                <div className="loading">Loading products...</div>
            </div>
        );
    }

    return (
        <>
            <TotalNav />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/addProduct" element={<AddProductForm onProductAdded={handleProductAdded} />} />
                <Route path="/products" element={<ProductList products={products} onDeleteProduct={handleProductDeleted} />} />
            </Routes>
            {error && <div className="error">{error}</div>}
        </>
    );
}