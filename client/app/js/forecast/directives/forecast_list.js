module.exports = function(app) {
  app.directive('forecastItemsWidget', () => {
    return {
      restrict: 'AC',
      repalce: true,
      require: '^ngController',
      transclude: true,
      templateUrl: '/templates/forecast/directives/forecast_list.html',
      scope: {
        forecast: '='
      },
      link: function(scope, element, attrs, controller){
        var actions = {
          update: controller.updateForecast,
          create: controller.createForecast
        };
        scope.save = actions[scope.action];
      }
    };
  });
};
