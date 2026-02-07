/**
 * AI Pong - Express Server
 * Minimal static file server for the Pong game
 * 
 * Created by: Skippy the Magnificent
 */

require('dotenv').config();
const express = require('express');
const path = require('path');

// Load port from environment - REQUIRED (no hardcoded default)
const PORT = process.env.PORT;

if (!PORT) {
  console.error('❌ ERROR: PORT environment variable is required.');
  console.error('   Create a .env file with PORT=<your-port> or set it in your environment.');
  process.exit(1);
}

const app = express();

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', game: 'ai-pong', version: '1.0.0' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🏓 AI Pong server running at http://localhost:${PORT}`);
  console.log(`   Health check: http://localhost:${PORT}/health`);
});
