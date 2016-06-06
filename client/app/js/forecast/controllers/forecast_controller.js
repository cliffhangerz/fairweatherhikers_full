const angular = require('angular');
var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('ForecastController', ['fwhResource', function(Resource) {
    this.forecast = [];
    this.errors = [];
    var weather = new Resource(this.forecast, this.errors, baseUrl + '/api/forecast', {errMsgs: {getall: 'Forecast Error!'}});
    this.getAll = weather.getAll.bind(weather);
  }]);
};
