const express = require('express');
const router = express.Router();
const { register, login, getUserProfile } = require('../controllers/authController');
const { authenticateJWT } = require('../middleware/authMiddleware');

// /api/auth

//POST User registration
router.post('/register', register);

//POST User login
router.post('/login', login);

//protected GET User profile
router.get('/profile', authenticateJWT, getUserProfile);

module.exports = router;