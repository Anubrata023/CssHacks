const Complaint = require('../models/Complaint');

// POST /api/complaints
exports.createComplaint = async (req, res) => {
  try {
    const { title, description, category, subcategory, urgency } = req.body;
    
    // req.user is set by authMiddleware
    const newComplaint = new Complaint({
      user: req.user.id,
      title,
      description,
      category,
      subcategory,
      urgency,
    });

    await newComplaint.save();
    res.status(201).json(newComplaint);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error creating complaint' });
  }
};

// GET /api/user/history
exports.getUserHistory = async (req, res) => {
  try {
    const complaints = await Complaint.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(complaints);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error fetching history' });
  }
};

// GET /api/analytics/stats
exports.getAnalyticsStats = async (req, res) => {
  try {
    const total = await Complaint.countDocuments();
    const resolved = await Complaint.countDocuments({ status: 'resolved' });
    const pending = await Complaint.countDocuments({ status: 'pending' });
    const critical = await Complaint.countDocuments({ status: 'critical' });

    // Aggregate by category
    const categoryStats = await Complaint.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);

    res.json({
      summary: { total, resolved, pending, critical },
      byCategory: categoryStats.map(c => ({ label: c._id, value: c.count }))
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error fetching analytics' });
  }
};
