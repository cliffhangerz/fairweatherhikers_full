module.exports = function(app) {
  app.directive('userprofileListItem', function() {
    return {
      restrict: 'EAC',
      replace: true,
      require: '^ngController',
      transclude: true,
      templateUrl: '/templates/userprofile/directives/userprofile_list_item.html',
      scope: {
        favorite: '='
      }
      // link: function(scope, element, attrs, controller) {
      //   scope.remove = controller.removeUser;
      // }
    };
  });
};