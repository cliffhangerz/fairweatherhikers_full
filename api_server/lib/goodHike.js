module.exports = exports = function(data, res, cb) {
  const ForecastIo = require('forecastio');

  var trailArray = data;
  var goodWeatherTrailArray = [];

  if (!trailArray.length) {
    return res.status(200).json({
      msg: 'No trails in the database, please enter some trails'
    });
  }
  var counter = 0;

  trailArray.forEach((trail) => {
    var goodHike = {};
    var trailName = trail.trailName;
    var trailLon = trail.lon;
    var trailLat = trail.lat;

    goodHike.trailName = trailName;
    goodHike.weatherForecast = [];

    var forecastIo = new ForecastIo('ce1e9e7c47068378251586a90ecb14cd');
    forecastIo.forecast(trailLat, '-' + trailLon).then((data) => {
      var jsonString = JSON.stringify(data, null, 2);
      var parsed = JSON.parse(jsonString);

      for (var i = 0; i < 3; i++) {
        var dateString = new Date(parsed['daily']['data'][i]['time'] * 1000); // eslint-disable-line
        dateString = new Date(dateString).toUTCString();
        var date = dateString.split(' ').slice(0, 4).join(' ');

        var rainChanceString = parsed['daily']['data'][i]['precipProbability'] * 100; // eslint-disable-line
        var rainChance = Math.round(rainChanceString);
        goodHike.weatherForecast[i] = rainChance;
        if (i === 2) {
          counter++;
          goodWeatherTrailArray.push(goodHike);
          if (counter === trailArray.length) {
            cb(goodWeatherTrailArray);
          }
        }
      }
    });
  });
};
