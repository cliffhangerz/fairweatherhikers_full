module.exports = function(app) {
  app.factory('commService', ['$rootScope', function() {
    return {
      var remote = new Resource(this.trails, this.errors, baseUrl + '/api/trails', {errMsgs: {getAll: 'Trails Error.'}});
      this.getAll = remote.getAll.bind(remote);
    };
  }]);
};