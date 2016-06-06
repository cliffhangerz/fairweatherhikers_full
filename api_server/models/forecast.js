const mongoose = require('mongoose');

var forecastSchema = new mongoose.Schema({
  currentDay: { type: Number },
  currentSummary: { type: String },
  currentIcon: { type: String },
  currentPrecipProbability: { type: Number },
  currentTemperature: { type: Number },
  currentTemperatureMax: { type: Number },
    weekDay: { type: String },
    weekDaySummary: { type: String },
    weekDayIcon: { type: String },
    weekDayPrecipProbability: { type: Number },
    weekDayTemperature: { type: Number },
    weekDayTemperatureMin: { type: Number },
    weekDayTemperatureMax: { type: Number }
});

module.exports = mongoose.model('Forecast', forecastSchema);
