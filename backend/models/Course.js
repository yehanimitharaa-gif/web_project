const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  university: { type: String, required: true },
  shortName: { type: String },
  stream: { type: String, required: true },
  district: { type: String, required: true },
  cutoffZ: { type: Number, required: true },
  faculty: { type: String },
  duration: { type: String },
  medium: { type: String },
  jobDemand: { type: String, default: 'High' }
});

module.exports = mongoose.model('Course', courseSchema);