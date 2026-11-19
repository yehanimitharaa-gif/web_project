const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  code: { type: String, required: true },
  name: { type: String, required: true },
  university: { type: String, required: true },
  shortName: { type: String },
  stream: { type: String, required: true },
  faculty: { type: String },
  duration: { type: String },
  medium: { type: String },
  jobDemand: { type: String, default: 'High' },
  intake: { type: Number },
  districtCutoffs: { type: Map, of: Number }
});

module.exports = mongoose.model('Course', courseSchema);