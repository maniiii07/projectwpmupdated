const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Get the profile of the currently logged-in user
exports.getUserProfile = async (req, res) => {
  try {
    // req.user is attached by the authMiddleware
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update user's name and phone number
// Update user's name and phone number
exports.updateUserProfile = async (req, res) => {
  try {
    const { name, phone } = req.body;
    const user = await User.findById(req.user.id);

    if (user) {
      user.name = name || user.name;

      // ✅ CORRECTED LOGIC: Explicitly check if 'phone' was provided in the request
      // This allows saving an empty string, effectively clearing the phone number.
      if (phone !== undefined) {
        user.phone = phone;
      }

      const updatedUser = await user.save();
      res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Change user's password
exports.changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the old password is correct
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect old password' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: 'Password changed successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};


