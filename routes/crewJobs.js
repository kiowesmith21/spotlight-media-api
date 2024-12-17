const express = require('express');
const router = express.Router();
const {
  getCrewJobs,
  getCrewJobById,
  updateCrewJob,
  createCrewJob,
  deleteCrewJob,
} = require('../controllers/crewJobsController');

// /api/crew-jobs

// GET all crew jobs
router.get('/', getCrewJobs);

// GET a single crew job by id
router.get('/:id', getCrewJobById);

// PUT update an existing crew job
router.put('/:id', updateCrewJob);

// POST a new crew job
router.post('/', createCrewJob);

// DELETE delete a crew job by id
router.delete('/:id', deleteCrewJob);

module.exports = router;
