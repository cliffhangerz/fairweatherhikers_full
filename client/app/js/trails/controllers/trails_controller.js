const angular = require('angular');
var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('TrailsController', ['fwhResource', function(Resource) {
    this.trails = [];
    this.errors = [];
    this.stupid = '';
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
    this.getClickedName = function(elem) {
        var clickedName;
        var clickedTemp;
        clickedName = elem.trailName;
        clickedTemp = elem.weather.data[0].temperatureMax;
        this.stupid = elem;
        alert(this.stupid.trailName);
        document.getElementById('todayTemp').innerHTML = this.stupid.trailName +' Today\'s high: ' + this.stupid.weather.data[0].temperatureMax;
        alert(clickedName);
        alert(clickedTemp);
      };
  }]);
};
