const Router = require('express').Router;
const Forecast = require(__dirname + '/../models/forecast');
const errorHandler = require(__dirname + '/../lib/db_error_handler');
const forecastData = require(__dirname + '../../lib/forecast_updater');
const bodyParser = require('body-parser').json();

var forecastRouter = module.exports = exports = Router();


forecastRouter.get('/forecast', (req, res) => {
  Forecast.find( req.query, (err, data) => {
    console.log("inside forecast_routes");
    console.log('req.query:', req.query);
    if (err) return errorHandler(err, res);
    res.status(200).json(data);
  });
});

forecastRouter.post('/forecast', bodyParser, (req, res) => {
  console.log("Trying to POST to forecast...");
  var newForecast = new Forecast(req.body);
  console.log('this is req.body: ', req.body);
  newForecast.save((err, data) => {
    console.log("trying to SAVE in forecast routes");
    console.log("this is the data: ", data);
    if (err) return errorHandler(err, res);
    res.status(200).json(data);
  });
});


// newForecast.validate((err) => {
//  console.log("validate error is: ",err);
//  if (err) {
//    console.log("calling error handler");
//    return errorHandler(err);
//  }
