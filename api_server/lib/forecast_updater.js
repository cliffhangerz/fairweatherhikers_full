const Forecast = require(__dirname + '../models/forecast.js');
const errorHandler = require(__dirname + '/db_error_handler');
const request = require('superagent');

var forecastData = function(callback) {
  var lat = 47.6205;
  var lon = 122.3493;
  request.get('https://api.forecast.io/forecast/API_KEY/' + lat + ',-' + lon)
  .end((err, res) => {
    if (err) return errorHandler(err);

    
  })
}
