const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['student', 'admin'],
    required: true,
  },
  scholarId: {
    type: String,
    required: function() { return this.role === 'student'; }
  },
  employeeId: {
    type: String,
    required: function() { return this.role === 'admin'; }
  },
  department: {
    type: String,
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
