const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Otp = require('../models/Otp');

// Helper to generate 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

exports.sendOtp = async (req, res) => {
  try {
    const { name, email, password, department, type, scholarId, employeeId } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    
    // Auto-register for demonstration purposes if they don't exist
    if (!user) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user = new User({
        name,
        email,
        password: hashedPassword,
        department,
        role: type,
        scholarId: type === 'student' ? scholarId : undefined,
        employeeId: type === 'admin' ? employeeId : undefined,
      });
      await user.save();
    } else {
      // Validate password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
    }

    // Generate OTP
    const otp = generateOTP();
    
    // Save to OTP DB (overwrites existing if same email using aggregate/upsert or just delete and insert)
    await Otp.deleteMany({ email });
    const newOtp = new Otp({ email, otp });
    await newOtp.save();

    // CRITICAL: Terminal output for Anti Gravity
    console.log('\n=======================================');
    console.log(`[FAXX OTP SYSTEM] OTP for ${email}: ${otp}`);
    console.log(`This OTP expires in exactly 30 seconds.`);
    console.log('=======================================\n');

    res.status(200).json({ message: 'OTP sent to terminal successfully. Please verify.' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const data = await Otp.findOne({ email });
    
    if (!data) {
      return res.status(403).json({ errorCode: 'OTP_EXPIRED', message: 'No OTP found or it has expired (30 seconds limit).' });
    }

    // Verify OTP
    if (data.otp !== otp) {
      return res.status(403).json({ errorCode: 'OTP_INVALID', message: 'Invalid OTP.' });
    }

    // Success - retrieve user and generate full JWT
    await Otp.deleteOne({ email });
    const user = await User.findOne({ email });

    const payload = {
      user: {
        id: user.id,
        role: user.role,
        name: user.name
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'your_super_secret_jwt_key_here',
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token, user: payload.user });
      }
    );

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
