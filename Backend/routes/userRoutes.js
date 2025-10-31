const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/authMiddleware');
const { 
  getUserProfile, 
  updateUserProfile, 
  changePassword 
} = require('../controllers/userController');

// GET /api/users/profile - Get user profile
router.get('/profile', authMiddleware, getUserProfile);

// PUT /api/users/profile - Update user profile
router.put('/profile', authMiddleware, updateUserProfile);

// PUT /api/users/password - Change user password
router.put('/password', authMiddleware, changePassword);

module.exports = router;