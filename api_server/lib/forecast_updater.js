var https = require('https');
var http = require('http');
var lat = 47.6205;
var lon = 122.3493;
var API_KEY = 'fdbc915b0ead7e316556b1de658613ef';
var fs = require('fs');

var url = 'https://api.forecast.io/forecast/' + API_KEY + '/' + lat + ',-' + lon

var request = https.get(url, (response) => {
  response.setEncoding('utf-8');
  var buffer = '';
  var data;
  var headers = {'Content-Type': 'application/json'};

  response.on('data', (chunk) => {
    buffer += chunk;
  });

  response.on('end', (err) => {
    console.log('\n');
    data = JSON.parse(buffer);

    console.log("data is:", data);
    console.log("does this get the summary? ", data.hourly.data[0].summary);
    // Forecast.io gives us the 49 hours after our request
    // take the length / 2 to get the next 24 hours
    // then sort the array with a compare and take the
    // 0-th term for low temp. Reverse and take 0-th to get
    // high temp. Can't take the -1th term.
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



    var postOptions = {
      hostname: 'localhost',
      port: '3000',
      path: '/api/forecast',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    var postData = http.request(postOptions, (res) => {
    });
    postData.write(buffer);
    postData.end();
  });
});
