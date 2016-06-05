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
      // console.log("res is:", res.body);
      // // Forecast.io gives us the 49 hours after our request
      // // take the length / 2 to get the next 24 hours
      // // then sort the array with a compare and take the
      // // 0-th term for low temp. Reverse and take 0-th to get
      // // high temp. Can't take the -1th term.
      // for (var i = 0; i < res.body.hourly.data.length / 2; i++) {
      //   temps.push(res.body.hourly.data[i].temperature);
      // }
      //
      // function compare(a, b) {
      //   return (a - b);
      // }
      // var newTemps = temps.sort(compare);
      // var lowTemp = newTemps[0];
      // var highTemp = newTemps.reverse()[0];
      // console.log("low Temp: ", lowTemp);
      // console.log("high Temp: ", highTemp);
      //
      // // Let's add some data to the db
      // // It should overwrite whatever is there because it will change each day
      // request.post('/forecast')
      // .send({
      //   currentDay: 'String',
      //   currentSummary: 'String',
      //   currentIcon: 'String',
      //   currentPrecipitationProbability: 1,
      //   currentTemperatureMin: lowTemp,
      //   currentTemperatureMax: highTemp,
      //   notCurrent: {
      //     weekDay: 'String',
      //     weekDaySummary: 'String',
      //     weekDayIcon: 'String',
      //     weekDayPrecipitationProbability: 1,
      //     weekDayTemperatureMin: lowTemp,
      //     weekDayTemperatureMax: highTemp
      //   }
      // })
      // .end( function(err, res) {
      //     if (err) return errorHandler(err);
      // });
      // console.log("past the post...");
    });
};

module.exports = exports = forecastData;
