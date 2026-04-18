const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Helper: generate a 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// ============================================
// POST /api/auth/send-otp
// ============================================
router.post('/send-otp', async (req, res) => {
  try {
    const { name, email, password, department, type, scholarId, employeeId } = req.body;
    const users = req.app.locals.users;
    const otps = req.app.locals.otps;

    // Check if user already exists in memory
    let user = users.find(u => u.email === email);

    if (!user) {
      // Auto-register: hash password and store in memory
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user = {
        id: Date.now().toString(),
        name,
        email,
        password: hashedPassword,
        department,
        role: type,
        scholarId: type === 'student' ? scholarId : undefined,
        employeeId: type === 'admin' ? employeeId : undefined,
      };
      users.push(user);
      console.log(`[FAXX] New ${type} registered: ${email}`);
    } else {
      // Validate password against stored hash
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
    }

    // Generate OTP and store with timestamp
    const otp = generateOTP();
    const timestamp = Date.now();

    // Remove any existing OTP for this email
    const existingIndex = otps.findIndex(o => o.email === email);
    if (existingIndex !== -1) otps.splice(existingIndex, 1);

    // Push new OTP entry
    otps.push({ email, otp, timestamp });

    // ========= TERMINAL OUTPUT =========
    console.log('\n=======================================');
    console.log(`  [FAXX OTP] Code for ${email}: ${otp}`);
    console.log(`  Expires in exactly 30 seconds.`);
    console.log('=======================================\n');

    res.status(200).json({ message: 'OTP sent to terminal. Please verify.' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// ============================================
// POST /api/auth/verify-otp
// ============================================
router.post('/verify-otp', (req, res) => {
  try {
    const { email, otp } = req.body;
    const otps = req.app.locals.otps;
    const users = req.app.locals.users;

    // Find the OTP entry
    const index = otps.findIndex(o => o.email === email);

    if (index === -1) {
      // No OTP exists — either never sent or already consumed
      return res.status(403).json({ message: 'No OTP found. Please request a new one.' });
    }

    const entry = otps[index];

    // STRICT 30-SECOND CHECK
    const elapsed = Date.now() - entry.timestamp;
    if (elapsed > 30000) {
      otps.splice(index, 1);
      return res.status(403).json({ message: 'OTP expired (30 second limit exceeded).', locked: true });
    }

    // WRONG CODE CHECK — 3 attempts max
    if (entry.otp !== otp) {
      entry.attempts = (entry.attempts || 0) + 1;
      console.log(`[FAXX] ❌ Wrong OTP attempt ${entry.attempts}/3 for ${email}`);

      if (entry.attempts >= 3) {
        otps.splice(index, 1); // Destroy OTP after 3 failures
        console.log(`[FAXX] 🔒 ${email} locked out after 3 failed attempts.`);
        return res.status(403).json({ message: '3 failed attempts. Session terminated.', locked: true });
      }

      return res.status(403).json({
        message: `Invalid OTP. ${3 - entry.attempts} attempt(s) remaining.`,
        locked: false,
        remaining: 3 - entry.attempts
      });
    }

    // SUCCESS — remove used OTP
    otps.splice(index, 1);

    // Find the user and generate JWT
    const user = users.find(u => u.email === email);
    const payload = {
      user: {
        id: user.id,
        role: user.role,
        name: user.name
      }
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET || 'faxx_secret_key', { expiresIn: '1h' });

    console.log(`[FAXX] ✅ ${email} authenticated successfully.`);
    // Return full user profile for frontend compatibility
    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        type: user.role,
        role: user.role,
        department: user.department,
        scholarId: user.scholarId,
        employeeId: user.employeeId
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
