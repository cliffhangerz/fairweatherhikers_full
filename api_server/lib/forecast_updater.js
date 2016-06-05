const Forecast = require(__dirname + '/../models/forecast');
const errorHandler = require(__dirname + '/db_error_handler');
const request = require('superagent');


console.log("At the top of forecast_updater");
var forecastData = function() {
  console.log('broadcasting from forecast_updater');
  var lat = 47.6205;
  var lon = 122.3493;
  var API_KEY = 'fdbc915b0ead7e316556b1de658613ef';
  var temps = [];
  request.get('https://api.forecast.io/forecast/' + API_KEY + '/' + lat + ',-' + lon)
  .end((err, res) => {
    console.log("in the end...");
    console.log("res is: ", res.body);
    if (err) return errorHandler(err);
    for (var i = 0; i < res.body.hourly.data.length / 2; i++) {
      temps.push(res.body.hourly.data[i].temperature);
    };
    function compare(a,b){
      return(a-b);
    }
    var newTemps = temps.sort(compare);
    console.log(newTemps);
    var lowTemp = newTemps[0];
    var highTemp = newTemps.reverse()[0];
    console.log("low Temp: ", lowTemp);
    console.log("high Temp: ", highTemp);
    Forecast.POST({
      currentDay: res.body.currently.time
    });
  });
};

module.exports = exports = forecastData;
