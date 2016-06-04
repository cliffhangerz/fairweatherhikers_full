var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('TrailsController', ['fwhResource', function(Resource) {
    this.trails = [];
    this.errors = [];
    var remote = new Resource(this.trails, this.errors, baseUrl + '/api/trails', {errMsgs: {getAll: 'Trails Error.'}});
    this.getAll = remote.getAll.bind(remote);
    this.createTrail = function() {
      remote.create(this.newTrail)
        .then(() => {
          this.newTrail = null;
        });
    }.bind(this);
    this.updateTrail = function(trail) {
      remote.update(trail)
        .then(() => {
          trail.editing = false;
        });
    };
    this.removeTrail = remote.remove.bind(remote); 
    this.getAll();
  }]);
};