module.exports = function(app) {
  require('./signup_controller')(app);
  require('./signin_controller')(app);
  require('./auth_controller')(app);
};