const express = require('express');
const router = express.Router();
const {
  getResources,
  getResourceById,
  createResource,
  updateResource,
  deleteResource,
} = require('../controllers/resourcesController');

// /api/resources

// GET all resources
router.get('/', getResources);

// GET a single resource by ID
router.get('/:id', getResourceById);

// POST a new resource
router.post('/', createResource);

// PUT to update a resource
router.put('/:id', updateResource);

// DELETE a resource by ID
router.delete('/:id', deleteResource);

module.exports = router;
