// Admin creation route (for initial setup only)
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');

// Load env vars
dotenv.config();


// Connect to MongoDB
connectDB().then(() => console.log('DB connection established')).catch(err => console.error('DB connection error:', err));

const app = express();


// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve images

// Log every request
app.use((req, res, next) => {
	console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
	next();
});

// Routes
app.use('/api/v1/auth', require('./src/routes/authRoutes'));
app.use('/api/v1/users', require('./src/routes/userRoutes'));
app.use('/api/v1/products', require('./src/routes/productRoutes'));
app.use('/api/v1/orders', require('./src/routes/orderRoutes'));
app.use('/api/v1/admin', require('./src/routes/adminRoutes'));
app.use('/api/v1/cart', require('./src/routes/cartRoutes'));


// Health check endpoint
app.get('/api/v1/health', (req, res) => {
	console.log('Health check endpoint hit');
	res.json({ status: 'ok', timestamp: new Date().toISOString() });
});


// Error handler
app.use((err, req, res, next) => {
	console.error('Error:', err);
	require('./src/middleware/errorHandler')(err, req, res, next);
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} [${new Date().toLocaleString()}]`));
