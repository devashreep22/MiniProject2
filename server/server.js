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
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Log every request with more details
app.use((req, res, next) => {
	console.log(`\n[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
	console.log('Headers:', req.headers.authorization ? 'Auth token present' : 'No auth token');
	next();
});

// Routes
app.use('/api/v1/auth', require('./src/routes/authRoutes'));
app.use('/api/v1/users', require('./src/routes/userRoutes'));
app.use('/api/v1/products', require('./src/routes/productRoutes'));
app.use('/api/v1/orders', require('./src/routes/orderRoutes'));
app.use('/api/v1/admin', require('./src/routes/adminRoutes'));
app.use('/api/v1/cart', require('./src/routes/cartRoutes'));

console.log('\n=== Routes Mounted ===');
console.log('Auth routes: /api/v1/auth');
console.log('User routes: /api/v1/users');
console.log('Product routes: /api/v1/products');
console.log('Order routes: /api/v1/orders');
console.log('Admin routes: /api/v1/admin');
console.log('Cart routes: /api/v1/cart');
console.log('=====================\n');

// Health check endpoint
app.get('/api/v1/health', (req, res) => {
	console.log('Health check endpoint hit');
	res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 404 handler - must be AFTER all routes
app.use((req, res, next) => {
	console.error(`[404] Route not found: ${req.method} ${req.originalUrl}`);
	res.status(404).json({ 
		message: 'Route not found',
		method: req.method,
		path: req.originalUrl
	});
});

// Error handler
app.use((err, req, res, next) => {
	console.error('Error:', err);
	require('./src/middleware/errorHandler')(err, req, res, next);
});

// Export the Express app so it can be reused by serverless wrappers (Vercel, Netlify, etc.)
module.exports = app;

// If this file is run directly (node server.js), start the HTTP server.
if (require.main === module) {
	const PORT = process.env.PORT || 5000;
	app.listen(PORT, () => console.log(`Server running on port ${PORT} [${new Date().toLocaleString()}]`));
}