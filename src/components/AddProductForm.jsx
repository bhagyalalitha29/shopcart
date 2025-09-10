import { useState } from "react";
import { theme } from "../theme";
import "../animations.css";

export default function AddProductForm ({ onProductAdded }){
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        category: '',
        image: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.price || !formData.description || !formData.category) {
            setMessage('All fields are required');
            return;
        }
        setIsSubmitting(true);
        setMessage('');
        try {
            const response = await fetch('https://shopcart-paisawapas.onrender.com/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                const newProduct = await response.json();
                setMessage('✅ Product added successfully!');
                setFormData({ name: '', price: '', description: '', category: '', image: '' });
                onProductAdded(newProduct);
                setTimeout(() => setMessage(''), 3000);
            } else {
                const error = await response.json();
                setMessage('❌ ' + (error.message || 'Error adding product'));
            }
        } catch (error) {
            setMessage('❌ Error connecting to server');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div style={styles.formWrap}>
            <h2 style={styles.heading}>➕ Add New Product</h2>
            {message && (
                <div style={message.includes('✅') ? styles.success : styles.error}>
                    {message}
                </div>
            )}
            <form onSubmit={handleSubmit} style={styles.form} autoComplete="off">
                <div style={styles.row}>
                    <div style={styles.group}>
                        <label style={styles.label}>Product Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter product name"
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.group}>
                        <label style={styles.label}>Price ($):</label>
                        <input
                            type="number"
                            step="0.01"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="0.00"
                            style={styles.input}
                        />
                    </div>
                </div>
                <div style={styles.group}>
                    <label style={styles.label}>Category:</label>
                    <select name="category" value={formData.category} onChange={handleChange} style={styles.input}>
                        <option value="">Select Category</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Clothing">Clothing</option>
                        <option value="Books">Books</option>
                        <option value="Home">Home</option>
                        <option value="Sports">Sports</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div style={styles.group}>
                    <label style={styles.label}>Description:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter product description"
                        style={{...styles.input, minHeight: 70, resize: 'vertical'}}
                    ></textarea>
                </div>
                <div style={styles.group}>
                    <label style={styles.label}>Image URL:</label>
                    <input
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        placeholder="Paste image URL"
                        style={styles.input}
                    />
                </div>
                <button type="submit" style={styles.submitBtn} disabled={isSubmitting}>
                    {isSubmitting ? '⏳ Adding Product...' : '➕ Add Product'}
                </button>
            </form>
        </div>
    );
}

const styles = {
    formWrap: {
        background: "rgba(255,255,255,0.18)", // glassmorphic, not cream
        borderRadius: 32,
        boxShadow: "0 8px 32px 0 rgba(34,139,34,0.13)",
        padding: "48px 48px 36px 48px",
        maxWidth: 720, // wider
        margin: "40px auto 28px auto",
        backdropFilter: "blur(14px)",
        border: "1.5px solid #b7e4c7",
        animation: "fadeInUp 0.7s cubic-bezier(.4,0,.2,1)",
    },
    heading: {
        color: theme.primary,
        fontWeight: 900,
        fontSize: "2rem",
        marginBottom: 18,
        textAlign: "center",
        letterSpacing: 1,
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: 18,
    },
    row: {
        display: "flex",
        gap: 18,
        flexWrap: "wrap",
    },
    group: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: 6,
        minWidth: 180,
    },
    label: {
        color: theme.secondary,
        fontWeight: 700,
        fontSize: "1.08rem",
        marginBottom: 2,
        letterSpacing: 0.5,
    },
    input: {
        background: "#f5fef7",
        border: "1.5px solid #b7e4c7",
        borderRadius: 14,
        padding: "12px 16px",
        fontSize: "1.08rem",
        color: theme.text,
        fontWeight: 600,
        outline: "none",
        transition: "border 0.2s, box-shadow 0.2s",
        boxShadow: "0 1.5px 8px 0 rgba(67,160,71,0.07)",
    },
    submitBtn: {
        background: "linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)",
        color: "#1b3c23",
        border: "none",
        borderRadius: 18,
        padding: "14px 0",
        fontWeight: 900,
        fontSize: "1.18rem",
        letterSpacing: 1,
        cursor: "pointer",
        marginTop: 10,
        boxShadow: "0 4px 16px rgba(67,160,71,0.13)",
        transition: "background 0.2s, color 0.2s, transform 0.2s",
    },
    success: {
        background: "#e9f5e1",
        color: theme.primary,
        borderRadius: 10,
        padding: "10px 0",
        marginBottom: 10,
        textAlign: "center",
        fontWeight: 700,
        fontSize: "1.08rem",
    },
    error: {
        background: "#ffeaea",
        color: theme.danger,
        borderRadius: 10,
        padding: "10px 0",
        marginBottom: 10,
        textAlign: "center",
        fontWeight: 700,
        fontSize: "1.08rem",
    },
};