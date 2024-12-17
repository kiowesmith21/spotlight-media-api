const express = require('express');
const router = express.Router();
const CrewJob = require('../models/CrewJob');

// Get all crew jobs with optional query parameters
const getCrewJobs = async (req, res) => {
  try {
    const { position, skills_required, location } = req.query;

    const query = {};
    if (position) query.position = { $regex: position, $options: 'i' };
    if (skills_required) query.skills_required = { $in: [skills_required] };
    if (location) query.location = location;

    const jobs = await CrewJob.find(query);
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single crew job by ID
const getCrewJobById = async (req, res) => {
  try {
    const crewJob = await CrewJob.findById(req.params.id);
    if (!crewJob) return res.status(404).json({ message: 'Crew job not found' });
    res.json(crewJob);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update an existing crew job
const updateCrewJob = async (req, res) => {
  try {
    const updatedCrewJob = await CrewJob.findByIdAndUpdate(
      req.params.id, 
      { $set: req.body }, 
      { new: true }
    );
    res.json(updatedCrewJob);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Create a new crew job
const createCrewJob = async (req, res) => {
  const { position, description, skills_required, location, availability } = req.body;

  const newCrewJob = new CrewJob({
    position,
    description,
    skills_required,
    location,
    availability,
  });

  try {
    const savedCrewJob = await newCrewJob.save();
    res.status(201).json(savedCrewJob);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a crew job by ID
const deleteCrewJob = async (req, res) => {
  try {
    await CrewJob.findByIdAndDelete(req.params.id);
    res.json({ message: 'Crew job deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getCrewJobs,
  getCrewJobById,
  updateCrewJob,
  createCrewJob,
  deleteCrewJob,
};

