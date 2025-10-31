const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    match: /@anurag\.edu\.in$/
  },
  password: { type: String, required: true },
  phone: { 
    type: String, 
    required: [true, 'Phone number is required'],
    trim: true,
    minLength: [1, 'Phone number cannot be empty'] 
  },
  // ✅ ADD THIS ROLE FIELD
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);