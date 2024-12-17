const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
  type: { type: String, required: true },
  location: { type: String, required: true },
  availability: { type: Boolean, default: true },
  details: { type: String },
});

const Resource = mongoose.model('Resource', ResourceSchema);

module.exports = Resource;

