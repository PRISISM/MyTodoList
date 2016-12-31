var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var morgan         = require('morgan');             // log requests to the console (express4)
var bodyParser     = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var passport       = require('passport');

if ((process.env.NODE_ENV || 'development') === 'development') {
  require('dotenv').load();
} 

// Put a database connection under var 'database' in .env file
mongoose.connect(process.env.database);

// On successful connection
mongoose.connection.on('connected', function () {  
  console.log('Mongoose default connection open to ' + process.env.database);
}); 

// If the connection throws an error
mongoose.connection.on('error',function (err) {  
  console.log('Mongoose default connection error: ' + err);
}); 

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended' : 'true'}));          // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type : 'application/vnd.api+json' }));// parse application/vnd.api+json as json
app.use(methodOverride());

// Routes and Passport
require('./app/routes')(app);
require('./app/models/User');
require('./app/passport');

app.use(passport.initialize());

// listen (start app with node server.js) 
var server = app.listen(process.env.PORT || 8080, function(){
  var port = server.address().port;
  console.log('App listening at port', port);
});

