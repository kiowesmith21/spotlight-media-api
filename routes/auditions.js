const express = require('express');
const router = express.Router();
const Audition = require('../models/Audition');

// /api/auditions

//GET all auditions
router.get('/', async (req, res) => {
    try {
      const { location, gender, role_name } = req.query; //get params from request
  
    //if given query parameters, set query to desired param
      const query = {};
      if (location) query.location = location;
      if (gender) query.gender = gender;
      if (role_name) query.role_name = { $regex: role_name, $options: 'i' };
  
      const auditions = await Audition.find(query); //find by the given query
      res.json(auditions);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  

//GET a single audition by id
router.get('/:id', async (req, res) => {
    try {
        const audition = await Audition.findById(req.params.id);
        if (!audition) return res.status(404).json({ message: 'Audition not found' }); //if no audition
        res.json(audition); //return audition
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//PUT Update an existing audition
router.put('/:id', async (req, res) => {
    try {
        const updatedAudition = await Audition.findByIdAndUpdate(
            req.params.id, //find by id
            { $set: req.body }, //set the data to the data given in the request
            { new: true }
        );
        res.json(updatedAudition); //return the audition as the response
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//POST a new audition
router.post('/', async (req, res) => {
    const { role_name, location, age_range, gender, union_status } = req.body;
    
    const newAudition = new Audition({
        role_name,
        location,
        age_range,
        gender,
        union_status,
    });

    try {
        const audition = await newAudition.save(); //save by inserting the new document into the db
        res.status(201).json(audition); //return the new audition as json
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//DELETE delete an audition by id
router.delete('/:id', async (req, res) => {
    try {
        await Audition.findByIdAndDelete(req.params.id);
        res.json({ message: 'Audition deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;