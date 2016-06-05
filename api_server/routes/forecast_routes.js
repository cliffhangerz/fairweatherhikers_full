const Router = require('express').Router;
const Forecast = require(__dirname + '/../models/forecast');
const errorHandler = require(__dirname + '/../lib/db_error_handler');
const forecastData = require(__dirname + '../../lib/forecast_updater');
var forecastRouter = module.exports = exports = Router();

forecastData();

forecastRouter.get('/forecast', (req, res) => {
  Forecast.find( req.query, (err, data) => {
    console.log("inside forecast_routes");
    if (err) return errorHandler(err, res);
    res.status(200).json(data);
  });
});
