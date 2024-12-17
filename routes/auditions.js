const express = require('express');
const router = express.Router();

// /api/auditions

const {
  createAudition,
  getAuditions,
  getAuditionById, // Import the function
  updateAudition,
  deleteAudition,
} = require('../controllers/auditionsController');

// Routes using controllers
router.post('/', createAudition);              // Create a new audition
router.get('/', getAuditions);                // Get all auditions
router.get('/:id', getAuditionById);          // Get a single audition by ID
router.put('/:id', updateAudition);           // Update an audition
router.delete('/:id', deleteAudition);        // Delete an audition

module.exports = router;