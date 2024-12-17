const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  description: { type: String },
  organizer: { type: String },
});

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;
