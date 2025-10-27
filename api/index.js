// Vercel serverless function wrapper for the Express app
// Exports a single handler that Vercel will invoke for incoming requests.
const serverless = require('serverless-http');
const app = require('../server/server');

module.exports = serverless(app);
