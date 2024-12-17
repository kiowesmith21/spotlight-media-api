const express = require('express');
const router = express.Router();
const Audition = require('../models/Audition');

//GET all auditions
router.get('/', async (req, res) => {
    try {
        const auditions = await Audition.find(); //find all auditions
        res.json(auditions); //return the response as json
    } catch (err) {
        res.status(500).json({ message: err.message });
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

module.exports = router;