const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  otp: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 30 // TTL index: document will be automatically deleted after 30 seconds
  }
});

module.exports = mongoose.model('Otp', otpSchema);
