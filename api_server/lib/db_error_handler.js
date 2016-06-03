module.exports = exports = function(err, res) {
  process.stdout.write(err);
  res.status(500).json({ msg: 'server error' });
};
