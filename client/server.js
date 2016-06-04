const express = require('express');

express().use(express.static(__dirname + '/build')).listen(5000, () => {
  console.log('Client server on port 5000');
});
