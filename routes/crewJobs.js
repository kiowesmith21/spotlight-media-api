const express = require('express');
const router = express.Router();
const CrewJob = require('../models/CrewJob');

// /api/crew-jobs

//GET all crew jobs
router.get('/', async (req, res) => {
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
  });
  

//GET a single crew job by id
router.get('/:id', async (req, res) => {
    try {
        const crewJob = await CrewJob.findById(req.params.id);
        if (!crewJob) return res.status(404).json({ message: 'Crew job not found' }); //if no audition
        res.json(crewJob); 
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//PUT Update an existing crew job
router.put('/:id', async (req, res) => {
    try {
        const updatedCrewJob = await CrewJob.findByIdAndUpdate(
            req.params.id, //find by id
            { $set: req.body }, //set the data to the data given in the request
            { new: true }
        );
        res.json(updatedCrewJob); 
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//POST a new crew job
router.post('/', async (req, res) => {
    const { position, description, skills_required, location, availability } = req.body;
    
    const newCrewJob = new CrewJob({
        position,
        description,
        skills_required,
        location,
        availability,
    });

    try {
        const savedCrewJob = await newCrewJob.save(); //save by inserting the new document into the db
        res.status(201).json(savedCrewJob); //return the new audition as json
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//DELETE delete a crew job by id
router.delete('/:id', async (req, res) => {
    try {
        await CrewJob.findByIdAndDelete(req.params.id);
        res.json({ message: 'Crew job deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;