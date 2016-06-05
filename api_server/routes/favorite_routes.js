const Router = require('express').Router;
const Favorite = require(__dirname + '/../models/favorite');
const bodyParser = require('body-parser').json();
const favoriteRouter = module.exports = new Router();
const jwtAuth = require(__dirname + '/../lib/jwt_auth');
const errorHandler = require(__dirname + '/../lib/db_error_handler');

favoriteRouter.get('/favorites', (req, res) => {
  Favorite.find(null, (err, data) => {
    if (err) return errorHandler(err, res);
    res.status(200).json(data);
  });
});

favoriteRouter.post('/favorites', jwtAuth, bodyParser, (req, res) => {
  var newFavorite = new Favorite(req.body);
  newFavorite.userId = req.user._id;
  newFavorite.save((err, data) => {
    if (err) return errorHandler(err, res);
    res.status(200).json(data);
  });
});

favoriteRouter.put('/favorites/:id', jwtAuth, bodyParser, (req, res) => {
  var favoriteData = req.body;
  delete favoriteData._id;
  Favorite.update({ _id: req.params.id }, favoriteData, (err) => {
    if (err) return errorHandler(err, res);
    res.status(200).json({ msg: 'You have changed favorite trail information' });
  });
});

favoriteRouter.delete('/favorites/:id', jwtAuth, (req, res) => {
  Favorite.remove({ _id: req.params.id }, (err) => {
    if (err) return errorHandler(err, res);
    res.status(200).json({ msg: 'Favorite Deleted' });
  });
});
