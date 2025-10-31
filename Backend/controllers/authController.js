const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    // 1. Make sure 'phone' is being received from the request body
    const { name, email, password, phone } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // 2. Make sure 'phone' is passed when creating the new user
    const newUser = new User({ name, email, password: hashedPassword, phone });

    // This is where Mongoose will check if all required fields (including phone) are present
    await newUser.save();

    res.status(201).json({ message: "✅ Signup successful!" });
  } catch (err) {
    // 3. This improved catch block sends back the specific validation error
    // (e.g., "phone: Phone number is required") instead of a generic message.
    res.status(400).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    
    const token = jwt.sign(
      { id: user._id, role: user.role }, 
      process.env.JWT_SECRET, 
      { expiresIn: "1d" }
    );
    res.status(200).json({ message: "✅ Login successful!", token });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};