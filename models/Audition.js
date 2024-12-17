//imports
const mongoose = require('mongoose');

//Create schema
const AuditionSchema = new mongoose.Schema({
    role_name: {type: String, required: true},
    location: {type: String},
    age_range: {type: String},
    gender: {type: String},
    union_status: {type: Boolean},
    posted_date: {type: Date, default: Date.now},
});

//export the model
module.exports = mongoose.model('Audition', AuditionSchema);