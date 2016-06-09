var baseUrl = require('../config').baseUrl;

module.exports = function(app) {
  app.factory('mapResource', ['$resource', function($resource) {
    return $resource(baseUrl + '/api/trails/', null,
      {
        'get': {method:'GET', isArray:true}
      }
    );
  }]);
};
