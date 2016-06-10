module.exports = function(app) {
  require('./handle_error')(app);
  require('./fwh_resource')(app);
  require('./map_resource')(app);
};
