const Resource = require('../models/Resource');

// GET all resources
const getResources = async (req, res) => {
  try {
    const { type, location, availability } = req.query;

    const query = {};
    if (type) query.type = { $regex: type, $options: 'i' };
    if (location) query.location = { $regex: location, $options: 'i' };
    if (availability !== undefined) query.availability = availability === 'true';

    const resources = await Resource.find(query);
    res.json(resources);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET a single resource by id
const getResourceById = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) return res.status(404).json({ message: 'Resource not found' });
    res.json(resource);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST a new resource
const createResource = async (req, res) => {
  const { type, location, availability, details } = req.body;

  const newResource = new Resource({
    type,
    location,
    availability,
    details,
  });

  try {
    const savedResource = await newResource.save();
    res.status(201).json(savedResource);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT to update a resource
const updateResource = async (req, res) => {
  try {
    const updatedResource = await Resource.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedResource);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE a resource by id
const deleteResource = async (req, res) => {
  try {
    await Resource.findByIdAndDelete(req.params.id);
    res.json({ message: 'Resource deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getResources,
  getResourceById,
  createResource,
  updateResource,
  deleteResource,
};
