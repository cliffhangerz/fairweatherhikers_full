const angular = require('angular'); // eslint-disable-line
var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('UserprofileController', ['fwhResource', function(Resource) {
    this.userprofile = [];
    this.errors = [];
    var remote = new Resource(this.userprofile, this.errors, baseUrl + '/api/userprofile', {errMsgs: {getAll: 'User profile Error.'}});
    this.getAll = remote.getAll.bind(remote);
    this.addUserprofile = function() {
      remote.add(this.newUserprofile)
        .then(() => {
          this.newUserprofile = null;
        });
    }.bind(this);
    this.getAll();
  }]);
};
