const express = require('express');
const router = express.Router();
const { register, login, getUserProfile, saveJobForUser, getUserSavedJobs, updateUserInfo } = require('../controllers/authController');
const { authenticateJWT } = require('../middleware/authMiddleware');

// /api/auth

//POST User registration
router.post('/register', register);

//POST User login
router.post('/login', login);

//protected GET User profile
router.get('/profile', authenticateJWT, getUserProfile);

//POST save a job for user
router.post('/saveJobForUser', authenticateJWT, saveJobForUser);  

//GET all saved jobs for user
router.get('/getUserSavedJobs', authenticateJWT, getUserSavedJobs);

//PUT update user info
router.put('/updateUserInfo', authenticateJWT, updateUserInfo);

module.exports = router;