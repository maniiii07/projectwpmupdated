const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/authMiddleware');
const { adminMiddleware } = require('../middlewares/adminMiddleware');
const { 
    getAllUsers, 
    deleteAnyItem, 
    adminLogin, 
    createAdmin 
} = require('../controllers/adminController');

// Public routes for admin setup
router.post('/register', createAdmin);
router.post('/login', adminLogin);

// Protected routes for admin actions
router.get('/users', [authMiddleware, adminMiddleware], getAllUsers);
router.delete('/items/:id', [authMiddleware, adminMiddleware], deleteAnyItem);

module.exports = router;