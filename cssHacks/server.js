const dns = require('node:dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// ============================================
// IN-MEMORY DATABASE (No MongoDB Required)
// ============================================
app.locals.users = [];
app.locals.otps = [];

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend files first
app.use(express.static(path.join(__dirname, './')));

// API Routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// FIXED: Node v25 Wildcard Catch-all
// '*any' satisfies the named parameter requirement of Path-to-Regexp V8
app.get('*any', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n🚀 FAXX Portal is LIVE!`);
  console.log(`Click to open: http://localhost:${PORT}`);
});