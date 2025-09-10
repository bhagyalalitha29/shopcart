import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
const app = express();

// Middleware
app.use(express.json());
app.use(express.static('public'));
app.use(cors())

// MongoDB connection
const MONGO_URI="mongodb+srv://root:GWxUsrnAM8dtGkD1@cluster-1.hdidlm6.mongodb.net/productsDB"
mongoose.connect(MONGO_URI)
.then(() => {
  console.log('✅ Connected to MongoDB');
}).catch((err) => {
  console.log('❌ MongoDB connection error:', err);
  console.log('Make sure MongoDB is running on your system');
});

// Product Schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String }
});

const Product = mongoose.model('Product', productSchema);

// API Routes
// In your Express backend route
app.get('/api/products', async (req, res) => {
  const search = req.query.search;
  let query = {};
  if (search) {
    query = { name: { $regex: search, $options: 'i' } };
  }
  const products = await Product.find(query);
  res.json(products);
});
// GET /api/products - Get all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
});

// POST /api/products - Add new product
app.post('/api/products', async (req, res) => {
  try {
    const { name, price, description, category, image } = req.body; // <-- Add image
    if (!name || !price || !description || !category) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newProduct = new Product({
      name,
      price: parseFloat(price),
      description,
      category,
      image // <-- Add image
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error: error.message });
  }
});

// DELETE /api/products/:id - Delete product
app.delete('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully', product: deletedProduct });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
});

const PORT =5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log('📱 Open your browser and go to the URL above');
});