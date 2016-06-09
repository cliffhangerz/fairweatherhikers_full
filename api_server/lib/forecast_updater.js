var https = require('https');
var http = require('http');
// var lat = 47.6205;
// var lon = 122.3493;
var API_KEY = 'fdbc915b0ead7e316556b1de658613ef';
var fs = require('fs');

module.exports = exports = function(lat, lon) {

  var url = 'https://api.forecast.io/forecast/' + API_KEY + '/' + lat + ',' + lon
  console.log("lat: ", lat);
  console.log("lon: ", lon);

  var request = https.get(url, (response) => {
    response.setEncoding('utf-8');
    var buffer = '';
    var forecast;
    var headers = { 'Content-Type': 'application/json' };

    response.on('data', (chunk) => {
      buffer += chunk;
      console.log(buffer);
    });
    response.on('end', (err) => {
      try {
      forecast = JSON.parse(buffer);
      }
      catch(fish) {
        return console.log(fish);
      }
      console.log("forecast is:", forecast);

      // Let's add some data to the db
      // It should overwrite whatever is there because it will change each day
      for (var i = 0; i < forecast.daily.data.length; i++) {
        var schemeifiedData = {
          lat: forecast.latitude,
          lon: forecast.longitude,
          day: forecast.daily.data[i].time,
          summary: forecast.daily.data[i].summary,
          icon: forecast.daily.data[i].icon,
          precipProbability: forecast.daily.data[i].precipProbability,
          temperatureMin: forecast.daily.data[i].temperatureMin,
          temperatureMax: forecast.daily.data[i].temperatureMax
        };
        console.log('schemeifiedData is', schemeifiedData);
        var postOptions = {
          hostname: 'localhost',
          port: '3000',
          path: '/api/forecast',
          method: 'POST',
          json: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
        var postData = http.request(postOptions, (res) => {});
          var preppedData = JSON.stringify(schemeifiedData);
          postData.write(preppedData);
          postData.end();
      }
      console.log('preppedData: ', preppedData);
    });
  });
};
