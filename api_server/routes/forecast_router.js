const Router = require('express').Router;
const Forecast = require(__dirname + '../models/forecast');
const errorHandler = require(__dirname + '../lib/db_error_handler');
var forecastRouter = module.exports = exports = Router();

forecastRouter.get(/forecast/, (req, res) => {
  Forecast.find( req.query, (err, data) => {
    if (err) return errorHandler(err, res);
    res.status(200).json(data);
  });
});
