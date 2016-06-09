var baseUrl = require('../config').baseUrl;

module.exports = function(app) {
  app.factory('fwhResource', ['$resource', function($resource) {
    return $resource(baseUrl + '/api/trails/', null,
      {
        'get':    {method:'GET', isArray:true}

      }
    );
  }]);
}
