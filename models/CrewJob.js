const mongoose = require('mongoose');

const CrewJobSchema = new mongoose.Schema({
    position: { type: String, required: true },
    description: { type: String },
    skills_required: [String],
    location: { type: String, required: true },
    availability: { type: String },
    posted_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('CrewJob', CrewJobSchema);