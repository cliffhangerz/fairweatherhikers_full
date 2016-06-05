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
    // data = JSON.stringify(buffer);

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
