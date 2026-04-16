const express = require('express');
const router = express.Router();
const complaintController = require('../controllers/complaintController');
const authMiddleware = require('../middlewares/authMiddleware');

// POST /api/complaints
router.post('/', authMiddleware, complaintController.createComplaint);

module.exports = router;
