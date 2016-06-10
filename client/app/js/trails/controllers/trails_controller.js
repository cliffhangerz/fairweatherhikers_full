const angular = require('angular');
var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('TrailsController', ['fwhResource', function(Resource) {
    this.trails = [];
    this.errors = [];
    this.selectedForecast = '';
    var remote = new Resource(this.trails, this.errors, baseUrl + '/api/trails', {errMsgs: {getAll: 'Trails Error.'}});
    this.getAll = remote.getAll.bind(remote);

    this.getAll();

    this.getWeather = function() {
      remote.getAll().then(function(data){
        remote.addWeather(data);
      });
    }

    this.updateSelectedForecast = function(elem) {
      var clickedName;
      var clickedTemp;
      var clickedPrecip;
      clickedName = elem.trailName;
      clickedTemp = elem.weather[0].temperatureMax;
      clickedPrecip = elem.weather[0].precipProbability;
      this.selectedForecast = elem;
      document.getElementById('todayTemp').innerHTML = 'At ' + this.selectedForecast.trailName +': Today\'s High: ' + this.selectedForecast.weather[0].temperatureMax + 'F Chance of Rain: ' + this.selectedForecast.weather[0].precipProbability * 100 + '%';
      };
      this.getWeather = function() {
        remote.getAll().then(function(data){
          remote.addWeather(data);
        });
      }
  }]);
};
