var baseUrl = require('../../config').baseUrl;
module.exports = function(app) {
  app.controller('SignInController', ['$http', '$location', 'handleError', 'fwhAuth', function($http, $location, handleError, auth) {
    this.buttonText = 'Submit';
    this.errors = [];
    this.authenticate = function(user) {
      $http({
        method: 'GET',
        url: baseUrl + '/api/signin',
        headers: {
          'Authorization': 'Basic ' + window.btoa(user.email + ':' + user.password)
        }
      })
        .then((res) => {
          auth.saveToken(res.data.token);
          auth.getEmail();
          $location.path('/userprofile');
        }, handleError(this.errors, 'Could not sign-in user.'));
    };
  }]);
};
