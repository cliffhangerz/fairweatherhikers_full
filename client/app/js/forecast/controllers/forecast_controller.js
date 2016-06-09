var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('ForecastController', ['fwhResource', function(Resource) {
    this.forecasts = [];
    this.errors = [];

    var weather = new Resource(this.forecasts, this.errors, baseUrl + '/api/forecast', {errMsgs: {getall: 'Forecast Error!'}});
    this.getAll = weather.getAll.bind(weather);
    function getAThing(lat, lon) {
      return forecast.lat === lat && forecast.lon === lon;
    }
    this.getOne = this.forecasts.find(getAThing);
  }]);
};
