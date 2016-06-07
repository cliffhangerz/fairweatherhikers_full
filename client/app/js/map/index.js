module.exports = function(app) {
  require('./directives')(app);
  require('./controllers')(app);
};
