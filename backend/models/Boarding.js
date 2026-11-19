const mongoose = require('mongoose');

const boardingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  universityNear: { type: String, required: true },
  price: { type: Number, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Any'], required: true },
  contact: { type: String, required: true },
  location: { type: String }
});

module.exports = mongoose.model('Boarding', boardingSchema);