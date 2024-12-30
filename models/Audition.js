//imports
const mongoose = require('mongoose');

//Create schema
const AuditionSchema = new mongoose.Schema({
    title: {type: String, required: true},
    union: {type: String},
    rate: {type: String},
    posted: {type: String},
    expires: {type: String},
    category: {type: String},
    location: {type: String},
    source: {type: String},
});

//export the model
module.exports = mongoose.model('Audition', AuditionSchema);