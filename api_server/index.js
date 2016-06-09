if (!process.env.APP_SECRET) throw new Error('You need to set the APP_SECRET environment variable');
if (!process.env.MONGO_URI) { console.log("Using test database.  set MONGO_URI to 'mongodb://localhost/db' if you want to use full db") }

var port = process.env.PORT || 3000;
var mongoUri = process.env.MONGO_URI || 'mongodb://localhost/db';
console.log("using mongo URI",mongoUri);
var app = require(__dirname + '/_server.js');
app.listen(port, mongoUri, () => console.log('server up on port:' + port));
