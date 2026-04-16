const express = require('express');
const router = express.Router();
const complaintController = require('../controllers/complaintController');

// GET /api/analytics/stats (Public or Protected depending on needs, assuming public for now)
router.get('/stats', complaintController.getAnalyticsStats);

module.exports = router;
