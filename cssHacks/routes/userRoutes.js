const express = require('express');
const router = express.Router();
const complaintController = require('../controllers/complaintController');
const authMiddleware = require('../middlewares/authMiddleware');

// GET /api/user/history
router.get('/history', authMiddleware, complaintController.getUserHistory);

module.exports = router;
