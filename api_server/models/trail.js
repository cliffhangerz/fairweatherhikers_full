const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var trailSchema = new Schema({
  trailName: { type: String, required: true },
  lat: { type: Number },
  lon: { type: Number },
  difficulty: { type: String },
  length: { type: String },
  time: { type: Number },
  userId: { type: String }
});

module.exports = exports = mongoose.model('Trail', trailSchema);
