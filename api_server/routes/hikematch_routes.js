const Router = require('express').Router;
const Trail = require(__dirname + '/../models/trail');
const hikeMatchRouter = module.exports = new Router();
const errorHandler = require(__dirname + '/../lib/db_error_handler');
const jwtAuth = require(__dirname + '/../lib/jwt_auth');
const dataResults = require(__dirname + '/../lib/dataresults');
const goodHike = require(__dirname + '/../lib/goodHike');

hikeMatchRouter.get('/hikematch', jwtAuth, (req, res) => {
  Trail.find({
    userId: req.user._id
  }, (err, data) => {
    if (err) return errorHandler(err, res);

    goodHike(data, res, (goodWeatherTrailArray) => {
      dataResults(goodWeatherTrailArray);
      res.status(200).json({
        msg: 'You found some hikes with nice weather',
        fairWeatherHikes: goodWeatherTrailArray
      });
    });
  });
});
