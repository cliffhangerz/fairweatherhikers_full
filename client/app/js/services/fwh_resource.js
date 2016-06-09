const _ = require('lodash');
module.exports = function(app) {
  app.factory('fwhResource', ['$http', 'handleError', function($http, handleError) {
    var Resource = function(resourceArr, errsArr, baseUrl, options) {
      this.weather = [];
      this.data = resourceArr;
      this.url = baseUrl;
      this.errors = errsArr;
      this.options = options || {};
      this.options.errMsgs = this.options.errMsgs || {};
    };

    Resource.prototype.getAll = function() {
      return $http.get(this.url)
        .then((res) => {
          this.data.splice(0);
          for (var i = 0; i < res.data.length && i < 10; i++) {
            this.data.push(res.data[i]);
          }
          for (var j = 0; j < this.data.length && j < 10; j++) {
            $http.get('http://localhost:3000/api/forecast?lat=' + this.data[j].lat.toFixed(1) + '&lon=' + this.data[j].lon.toFixed(1))
              .then((weather) => {
                this.weather.push(weather.data);
                for (var k = 0; k < this.data.length; k++) {
                  for (var n = 0; n < weather.data.length; n++) {
                    console.log("weather data: ", weather);
                    if (weather.data[n].lon === parseFloat(this.data[k].lon.toFixed(1)) && weather.data[n].lat === parseFloat(this.data[k].lat.toFixed(1))) {
                      this.data[k].weather = weather;
                    }
                  }
                  console.log("trails have weather? ", this.data);
                }
              })
          }
        }, handleError(this.errors, this.options.errMsgs.getAll || 'Could not GET resource.'))
    };

    Resource.prototype.create = function(resource) {
      return $http.post(this.url, resource)
        .then((res) => {
          this.data.push(res.data);
        }, handleError(this.errors, this.options.errMsgs.create || 'Could not CREATE resource.'));
    };

    Resource.prototype.update = function(resource) {
      return $http.put(this.url + '/' + resource._id, resource)
        .catch(handleError(this.errors, this.options.errMsgs.update || 'Could not UPDATE resource.'));
    };
      }
    );
  }]);
};
