const angular = require('angular');
var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('TrailsController', ['fwhResource', function(fwhResource) {

    this.getAll = function() {
      this.trails = fwhResource.get();
    };

    // this.createTrail = function() {
    //   remote.create(this.newTrail)
    //     .then(() => {
    //       this.newTrail = null;
    //     });
    // }.bind(this);
    // this.updateTrail = function(trail) {
    //   remote.update(trail)
    //     .then(() => {
    //       trail.editing = false;
    //     });
    // };
    // this.removeTrail = remote.remove.bind(remote);
    // this.getAll();
  }]);
};
