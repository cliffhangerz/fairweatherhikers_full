const express = require('express');
express().use(express.static(__dirname + '/build'))
.get('*', function(req, res) {
  res.redirect('/#' + req.url);
}).listen(5000, () => console.log('Client server ready on http://localhost:5000'));
