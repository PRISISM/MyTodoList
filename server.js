var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var morgan         = require('morgan');             // log requests to the console (express4)
var bodyParser     = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

require('dotenv').config();

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

// Define our model -- in larger scale app separate to app/models 
var Todo = mongoose.model('Todo', {
	// Schema
	text : String
});

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended' : 'true'}));          // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type : 'application/vnd.api+json' }));// parse application/vnd.api+json as json
app.use(methodOverride());

// Routes

app.get('/api/todos', function(req, res) {
	// Find all todos
	Todo.find(function(err, todos) {
		if (err)
			res.send(err);

		res.json(todos);
	});
});

app.post('/api/todos', function(req, res) {
	// Create a new Todo
	// Uses AJAX request from Angular
	// Model.create is same as 'new' and then .save()
	Todo.create({
		text : req.body.text,
		done: false
	}, function(err, todo) {
		if (err)
			res.send(err);

		// get all todos after creating another
		Todo.find(function(err, todos) {
			if (err) 
				res.send(err);
			res.json(todos);
			
		});
	});

});

app.delete('api/todos/:todo_id', function(req, res) {
	Todo.remove({
		_id : req.params.todo_id
	}, function(err, todo) {
		if (err)
			res.send(err);

		// get all todos after removing
		Todo.find(function(err, todos) {
			if (err)
				res.send(err);
			res.json(todos);
		});
	});
});

// Catch-all Route
app.get('*',function(req,res) {
    res.sendFile('./public/index.html', {root : __dirname});
});

// listen (start app with node server.js) 
app.listen(8080);
console.log("App listening on port 8080");


