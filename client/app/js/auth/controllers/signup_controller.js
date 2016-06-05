var baseUrl = require('../../config').baseUrl;
module.exports = function(app) {
  app.controller('SignUpController', ['$http', '$location',  'handleError', 'fwhAuth', function($http, $location, handleError, auth) {
    this.signup = true;
    this.errors = [];
    this.buttonText = 'Sign-up As New User';
    this.authenticate = function(user) {
      $http.post(baseUrl + '/api/signup', user)
        .then((res) => {
          auth.saveToken(res.data.token);
          auth.getEmail();
          $location.path('/userprofile');
        }, handleError(this.errors, 'Could not create user.'));
    };
  }]);
};