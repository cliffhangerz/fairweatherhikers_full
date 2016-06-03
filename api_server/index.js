if (!process.env.APP_SECRET) throw new Error('You need to set the APP_SECRET environment variable');

var port = process.env.PORT || 3000;

var app = require(__dirname + '/_server.js');
app.listen(port, 'mongodb://localhost/db', () => console.log('server up on port:' + port));
