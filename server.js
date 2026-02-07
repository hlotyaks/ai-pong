/**
 * AI Pong - Express Server
 * Minimal static file server for the Pong game
 * 
 * Created by: Skippy the Magnificent
 */

const express = require('express');
const path = require('path');

// Load environment variables (if .env exists)
const PORT = process.env.PORT || 8888;

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
