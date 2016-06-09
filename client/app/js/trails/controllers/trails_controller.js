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
    this.updateSelectedForecast = function(elem) {
        var clickedName;
        var clickedTemp;
        clickedName = elem.trailName;
        clickedTemp = elem.weather[0].temperatureMax;
        this.selectedForecast = elem;
        alert(this.selectedForecast.trailName);
        document.getElementById('todayTemp').innerHTML = this.selectedForecast.trailName +' Today\'s high: ' + this.selectedForecast.weather[0].temperatureMax;
        alert(clickedName);
        alert(clickedTemp);
      };

      this.getWeather = function() {
     remote.getAll().then(function(data){
       remote.addWeather(data);
     });
   }

  }]);
};
