const express = require('express');
const router = express.Router();

// ============================================
// POST /api/complaints — Student submits grievance
// ============================================
router.post('/', (req, res) => {
  try {
    const { id, category, subcategory, title, description, urgency, user } = req.body;

    const complaint = {
      id: id || 'CMP-' + Date.now(),
      category,
      subcategory,
      title,
      description,
      urgency,
      user: user || 'Student',
      status: 'pending',
      date: new Date().toISOString()
    };

    // Store in-memory
    if (!req.app.locals.complaints) req.app.locals.complaints = [];
    req.app.locals.complaints.unshift(complaint);

    // ========= TERMINAL NOTIFICATION =========
    console.log('\n╔══════════════════════════════════════════════╗');
    console.log('║  📋 GRIEVANCE SUBMITTED                      ║');
    console.log('╠══════════════════════════════════════════════╣');
    console.log(`║  Student : ${complaint.user}`);
    console.log(`║  Title   : ${complaint.title}`);
    console.log(`║  Category: ${complaint.category} > ${complaint.subcategory}`);
    console.log(`║  Urgency : ${complaint.urgency}`);
    console.log(`║  ID      : ${complaint.id}`);
    console.log('╠══════════════════════════════════════════════╣');
    console.log('║  ✅ "Your grievances are filled"             ║');
    console.log('╚══════════════════════════════════════════════╝\n');

    res.status(201).json({
      message: 'Your grievances are filled',
      complaint
    });

  } catch (error) {
    console.error('[FAXX] Error creating complaint:', error);
    res.status(500).json({ message: 'Server Error creating complaint' });
  }
});

// ============================================
// PATCH /api/complaints/:id/status — Admin resolves/updates
// ============================================
router.patch('/:id/status', (req, res) => {
  try {
    const { id } = req.params;
    const { status, admin } = req.body;

    const complaints = req.app.locals.complaints || [];
    const complaint = complaints.find(c => c.id === id);

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    const previousStatus = complaint.status;
    complaint.status = status;

    // ========= TERMINAL NOTIFICATION =========
    if (status === 'resolved') {
      console.log('\n╔══════════════════════════════════════════════╗');
      console.log('║  ✅ ISSUE RESOLVED                            ║');
      console.log('╠══════════════════════════════════════════════╣');
      console.log(`║  Complaint : ${complaint.title}`);
      console.log(`║  ID        : ${complaint.id}`);
      console.log(`║  Student   : ${complaint.user}`);
      console.log(`║  Resolved by: ${admin || 'Admin'}`);
      console.log(`║  Changed  : ${previousStatus} → ${status}`);
      console.log('╠══════════════════════════════════════════════╣');
      console.log('║  ✅ "Your issue is resolved"                  ║');
      console.log('╚══════════════════════════════════════════════╝\n');
    } else {
      console.log('\n=======================================');
      console.log(`  [FAXX] Status Update: ${complaint.id}`);
      console.log(`  ${complaint.title}: ${previousStatus} → ${status}`);
      console.log(`  Updated by: ${admin || 'Admin'}`);
      console.log('=======================================\n');
    }

    res.json({
      message: status === 'resolved' ? 'Your issue is resolved' : `Status updated to ${status}`,
      complaint
    });

  } catch (error) {
    console.error('[FAXX] Error updating complaint:', error);
    res.status(500).json({ message: 'Server Error updating complaint' });
  }
});

// ============================================
// GET /api/complaints — Fetch all complaints
// ============================================
router.get('/', (req, res) => {
  const complaints = req.app.locals.complaints || [];
  res.json(complaints);
});

module.exports = router;
