module.exports = exports = function(err, res) {
  throw(err);
  res.status(500).json({ msg: 'server error' });
};
