const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const trailRouter = require(__dirname + '/routes/trail_routes');
const favoriteRouter = require(__dirname + '/routes/favorite_routes');
const authRouter = require(__dirname + '/routes/auth_routes');
const hikeMatchRouter = require(__dirname + '/routes/hikematch_routes');
const forecastRouter = require(__dirname + '/routes/forecast_routes');

app.use('/api', trailRouter);
app.use('/api', favoriteRouter);
app.use('/api', authRouter);
app.use('/api', hikeMatchRouter);
app.use('/api', forecastRouter);
app.use(express.static(__dirname + '/../client/build'));

module.exports = exports = {
  server: { close: function() {
    throw new Error('Server not started yet!');
  }
},
  listen: function(port, mongoString, cb) {
    mongoose.connect(mongoString);
    return this.server = app.listen(port, cb);
  },
  close: function(cb) {
    this.server.close();
    if (cb) cb();
  }
};
