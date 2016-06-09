var baseUrl = require('../config').baseUrl;

module.exports = function(app) {
  app.factory('fwhResource', ['$http', 'handleError', function($http, handleError) {
    var testdata = function(resourceArr, errsArr, baseUrl, options) {

      var resource = {};

      resource.data = resourceArr;
      resource.url = baseUrl;
      resource.errors = errsArr;
      //resource.options = options || {};
      //resource.options.errMsgs = this.options.errMsgs || {};

      resource.getAll = function() {
        return $http.get(this.url)
          .then((res) => {
            this.data.splice(0);
            for(var i = 0; i < res.data.length; i++)
              this.data.push(res.data[i]);
          })
      };

      return resource;
    };

    this.trails = [];
    this.error = [];

    var myresource = new testdata(this.trails, this.errors, baseUrl + '/api/trails', {errMsgs: {getall: 'Trails Error!'}});

    // var test = function(resourceArr, errsArr, baseUrl, options) {
    //   this.data = resourceArr;
    //   this.url = baseUrl;
    //   this.errors = errsArr;
    //   this.options = options || {};
    //   this.options.errMsgs = this.options.errMsgs || {};
    // };

    // myresource.prototype.getAll = function() {
    //   return $http.get(this.url)
    //     .then((res) => {
    //       this.data.splice(0);
    //       for(var i = 0; i < res.data.length; i++)
    //         this.data.push(res.data[i]);
    //     }, handleError(this.errors, this.options.errMsgs.getAll ||'Could not GET resource.'))
    // };
    //
    // myresource.prototype.create = function(resource) {
    //   return $http.post(this.url, resource)
    //     .then((res) => {
    //       this.data.push(res.data);
    //     }, handleError(this.errors, this.options.errMsgs.create || 'Could not CREATE resource.'));
    // };
    //
    // myresource.prototype.update = function(resource) {
    //   return $http.put(this.url + '/' + resource._id, resource)
    //     .catch(handleError(this.errors, this.options.errMsgs.update ||'Could not UPDATE resource.'));
    // };
    //
    // myresource.prototype.remove = function(resource) {
    //   return $http.delete(this.url + '/' + resource._id)
    //     .then(() => {
    //       this.data.splice(this.data.indexOf(resource), 1);
    //     }, handleError(this.errors, this.options.errMsgs.remove || 'Could not REMOVE resource.'));
    // };

    myresource.getAll();

    return myresource;
  }]);
};
