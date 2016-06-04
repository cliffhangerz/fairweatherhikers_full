module.exports = function(app) {
  app.controller('AuthController', ['fwhAuth', 'handleError',  '$location', function(auth, handleError, $location) {
    this.email = '';
    this.errors = [];
    this.getEmail = function() {
      auth.getEmail()
        .then((currentUser) => {
          this.email = currentUser;
        }, handleError(this.errors, 'Could not get user email.'));
    }.bind(this);

    this.logout = function() {
      auth.removeToken();
      this.email = '';
      $location.path('/signin');
    }.bind(this);
  }]);
};