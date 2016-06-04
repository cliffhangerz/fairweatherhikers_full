module.exports = function(app) {
  app.factory('handleError', function() {
    return function(errsArr, message) {
      return function(err) {
        console.log(err);
        if (Array.isArray(errsArr))
          errsArr.push(new Error(message || 'There is a server error.'));
      };
    };
  });
};