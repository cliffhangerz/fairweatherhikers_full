const angular = require('angular');
const demoApp = angular.module('demoApp', [require('angular-route')]);

require('./services')(demoApp);
require('./trails')(demoApp);
require('./auth')(demoApp);

demoApp.config(['$routeProvider', function($rp) {
  $rp
    .when('/trails', {
      templateUrl: 'templates/trails/views/trails_view.html',
      controller: 'TrailsController',
      controllerAs: 'trailsctrl'
    })
    .when('/signup', {
      templateUrl: 'templates/auth_view/auth_view.html',
      controller: 'SignUpController',
      controllerAs: 'authctrl'
    })
    .when('/signin', {
      templateUrl: 'templates/auth_view/auth_view.html',
      controller: 'SignInController',
      controllerAs: 'authctrl'
    })
    .otherwise({
      redirectTo: '/signup'
    });
}]);