const mongoose = require('mongoose');

var forecastSchema = new mongoose.Schema({
  lat: { type: Number },
  lon: { type: Number },
  day: { type: String },
  summary: { type: String },
  icon: { type: String },
  precipProbability: { type: Number },
  temperatureMin: { type: Number },
  temperatureMax: { type: Number },
});

module.exports = mongoose.model('Forecast', forecastSchema);
