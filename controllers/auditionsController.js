const express = require('express');
const router = express.Router();
const Audition = require('../models/Audition');

//get auditions
const getAuditions = async (req, res) => {
    try {
      const { location } = req.query;
      const filters = {};
      if (location) filters.location = location; //if given query params
  
      const auditions = await Audition.find(filters); //get and filter within constraints of given params
      res.status(200).json(auditions);
    } catch (err) {
      res.status(500).json({ error: 'Failed to retrieve auditions' });
    }
  };
  

// Create a new audition
const createAudition = async (req, res) => {
    try {
      const newAudition = await Audition.create(req.body);
      res.status(201).json(newAudition);
    } catch (err) {
      res.status(500).json({ error: 'Failed to create audition' });
    }
  };

// Get a specific audition by ID
const getAuditionById = async (req, res) => {
    try {
      const audition = await Audition.findById(req.params.id);
      if (!audition) {
        return res.status(404).json({ error: 'Audition not found' });
      }
      res.status(200).json(audition);
    } catch (err) {
      res.status(500).json({ error: 'Failed to retrieve audition' });
    }
  };

// Update an existing audition
const updateAudition = async (req, res) => {
    try {
      const updatedAudition = await Audition.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json(updatedAudition);
    } catch (err) {
      res.status(500).json({ error: 'Failed to update audition' });
    }
  };
  
// Delete an audition
const deleteAudition = async (req, res) => {
    try {
      await Audition.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'Audition deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete audition' });
    }
  };
  
  module.exports = {
    createAudition,
    getAuditions,
    getAuditionById, // Include this in the exported functions
    updateAudition,
    deleteAudition,
  };
  