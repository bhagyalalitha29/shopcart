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
                console.log('Fetching products app.jsx:', data);
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

    const handleProductEdited = (updatedProduct) => {
        console.log('Updating product in App:', updatedProduct);
        setProducts(prev => prev.map(product => product._id === updatedProduct._id ? updatedProduct : product));
    };
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

    return (
        <>
            <TotalNav />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/addProduct" element={<AddProductForm onProductAdded={handleProductAdded} />} />
                <Route path="/products" element={<ProductList products={products} loading={loading} onDeleteProduct={handleProductDeleted} onEditProduct={handleProductEdited} />} />
            </Routes>
            {error && <div className="error">{error}</div>}
        </>
    );
}