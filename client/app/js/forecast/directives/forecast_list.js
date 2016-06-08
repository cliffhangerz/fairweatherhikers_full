module.exports = (app) => {
  app.directive('forecastItemsWidget', () => {
    return {
      restrict: 'EAC',
      replace: true,
      require: '^ngController',
      transclude: true,
      templateUrl: '/templates/forecast/directives/mainWidget.html',
      scope: {
        forecast: '='
      }
    };
  });
};
