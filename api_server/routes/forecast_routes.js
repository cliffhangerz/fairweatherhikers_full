const Router = require('express').Router;
const Forecast = require(__dirname + '/../models/forecast');
const errorHandler = require(__dirname + '/../lib/db_error_handler');
const forecastData = require(__dirname + '/../lib/forecast_updater');
const bodyParser = require('body-parser').json();

var forecastRouter = module.exports = exports = Router();

forecastRouter.get('/forecast', bodyParser, (req, res) => {
  // if(!req.query.lon.match(/-/)) req.query.lon = '-' + req.query.lon;
  Forecast.find(req.query, (err, data) => {
    if (err) return errorHandler(err, res);
    if (data.length === 0) {
      forecastData(req.query.lat, req.query.lon)
      Forecast.find(req.query, (err, data) => {
        res.status(200).json(data);
      })
    } else {
    res.status(200).json(data);
    }
  });
});

forecastRouter.post('/forecast', bodyParser, (req, res) => {
  var newForecast = new Forecast(req.body);
  newForecast.validate((err) => {
    console.log("validate error is: ", err);
    if (err) {
      console.log("calling error handler");
      return errorHandler(err);
    }
  });
  newForecast.save((err, data) => {
    if (err) return errorHandler(err, res);
    res.status(200).json(data);
  });
});
