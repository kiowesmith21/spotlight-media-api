const Event = require('../models/Event');

// GET all events
const getEvents = async (req, res) => {
  try {
    const { name, location, date } = req.query;

    const query = {};
    if (name) query.name = { $regex: name, $options: 'i' };
    if (location) query.location = { $regex: location, $options: 'i' };
    if (date) query.date = date;

    const events = await Event.find(query);
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET a single event by id
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST a new event
const createEvent = async (req, res) => {
  const { name, date, location, description, organizer } = req.body;

  const newEvent = new Event({
    name,
    date,
    location,
    description,
    organizer,
  });

  try {
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT to update an event
const updateEvent = async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE an event by id
const deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Event deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
};
