const _ = require('lodash');
module.exports = function(app) {
  app.factory('fwhResource', ['$http', '$q','handleError', function($http, $q, handleError) {
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
          var data = []
          for (var i = 0; i < res.data.length && i < 50; i++) {
            data.push(res.data[i]);
          }
          if(typeof data === 'object') {
            return data;
          } else {
            return $q.reject(data);
          }
        }, handleError(this.errors, this.options.errMsgs.getAll || 'Could not GET resource.')
      )
    };

    Resource.prototype.addWeather = function(data) {
      for (var i = 0; i < data.length; i++) {
        var weatherURL = 'http://localhost:3000/api/forecast?lat=' + data[i].lat.toFixed(1) + '&lon=' + data[i].lon.toFixed(1);
        $http.get(weatherURL)
          .then((weather) => {
            this.weather.push(weather.data);
            var found = data.filter(function(obj) {
              var checkObjLat = obj.lat.toFixed(1);
              var checkWeatherLat = weather.data[0].lat.toFixed(1);
              var checkObjLon = obj.lon.toFixed(1);
              var checkWeatherLon = weather.data[0].lon.toFixed(1);
              return checkObjLat === checkWeatherLat && checkObjLon === checkWeatherLon;
            });
            if (found.length > 0) {
              for (var j = 0; j < found.length; j++){
                found[j].weather = weather.data;
                checkData = this.data.filter(function(obj) {
                  var checkObjName = obj.trailName;
                  var checkWeatherName = found[j].trailName;
                  return checkObjName === checkWeatherName;
                });
                if (checkData.length === 0) {
                  this.data.push(found[j]);
                }
              }
            } else {
                console.log("didn't find trail for ",weather);
              }
              return this.data;
          }, handleError(this.errors, this.options.errMsgs.getAll || 'Could not GET resource.'))
      } // end for loop
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

    Resource.prototype.remove = function(resource) {
      return $http.delete(this.url + '/' + resource._id)
        .then(() => {
          this.data.splice(this.data.indexOf(resource), 1);
        }, handleError(this.errors, this.options.errMsgs.remove || 'Could not REMOVE resource.'));
    };
    return Resource;
  }]);
};
