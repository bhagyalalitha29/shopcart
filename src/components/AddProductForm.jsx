import { useState } from "react";

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
            const response = await fetch('http://localhost:5000/api/products', {
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
        <div className="add-product-form">
            <h2>➕ Add New Product</h2>
            {message && (
                <div className={message.includes('✅') ? 'success' : 'error'}>
                    {message}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group">
                        <label>Product Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter product name"
                        />
                    </div>
                    <div className="form-group">
                        <label>Price ($):</label>
                        <input
                            type="number"
                            step="0.01"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="0.00"
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label>Category:</label>
                    <select name="category" value={formData.category} onChange={handleChange}>
                        <option value="">Select Category</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Clothing">Clothing</option>
                        <option value="Books">Books</option>
                        <option value="Home">Home</option>
                        <option value="Sports">Sports</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter product description"
                    ></textarea>
                </div>

                <div className="form-group">
                    <label>Image URL:</label>
                    <input
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        placeholder="Paste image URL"
                    />
                </div>

                <button type="submit" className="submit-btn" disabled={isSubmitting}>
                    {isSubmitting ? '⏳ Adding Product...' : '➕ Add Product'}
                </button>
            </form>
        </div>
    );
}