const express = require('express');
const User = require(__dirname + '/../models/user');
const bodyParser = require('body-parser').json();
const basicHttp = require(__dirname + '/../lib/basic_http');
const jwtAuth = require(__dirname + '/../lib/jwt_auth');
const handleDBError = require(__dirname + '/../lib/db_error_handler');

var authenticationRouter = module.exports = exports = express.Router();

authenticationRouter.post('/signup', bodyParser, (req, res) => {
  if (req.body.email === '' || req.body.email.indexOf('@') < 0 || req.body.email.indexOf('.') < 0) { // eslint-disable-line
    return res.status(400).json({ msg: 'invalid email' });
  }
  if (req.body.password.length < 8) {
    return res.status(400).json({ msg: 'invalid password' });
  }
  User.find({ 'email': req.body.email }, (err, docs) => {
    if (err) return handleDBError(err);
    if (docs.length > 0) {
      return res.status(400).json({ msg: 'username taken' });
    }
  });

  var newUser = new User(req.body);
  req.body.email = null;
  var password = req.body.password;
  newUser.generateHash(password);
  req.body.password = null;
  password = null;

  newUser.save((err, user) => {
    if (err) return res.status(400).json({ msg: 'Could not create user.' });

    user.generateToken((err, token) => {
      if (err) return res.status(400).json({ msg: 'Could not generate token, sign in later.' });
      return res.status(200).json({ msg: 'good signup', token: token });
    });
  });
});

authenticationRouter.get('/signin', basicHttp, (req, res) => {
  User.findOne({ email: req.auth.email }, (err, user) => {
    if (err) return res.status(401).json({ msg: 'There is an error during sign-in, please try again!' }); //eslint-disable-line
    if (!user) return res.status(401).json({ msg: 'Invalid email!' });
    if (!user.compareHash(req.auth.password)) return res.status(401).json({ msg: 'Invalid password!'}); // eslint-disable-line
    user.generateToken((err, token) => {
      if (err) return res.status(401).json({ msg: 'Could not generate token, sign in later.' });
      return res.status(200).json({ msg: 'successful signin', token: token });
    });
  });
});

authenticationRouter.get('/userprofile', jwtAuth, function(req, res) {
  res.send({ email: req.user.email});
});
