var Todo = require('./models/Todo');
var User = require('./models/User');

var path = require('path');
var jwt = require('express-jwt');
var auth = jwt({
	secret: process.env.secret,
	userProperty: 'payload'
});

var ctrlAuth = require('./controllers/authentication');
var ctrlProfile = require('./controllers/profile');


module.exports = function(app) {

	app.get('/api/todos', function(req, res) {
		var userId = req.query.id;

		// Get all todos of the current user
		Todo.find({
				postedBy: userId
			})
			.populate('postedBy')
			.exec(function(err, posts) {
				res.json(posts);
			});

	});

	app.post('/api/todos', function(req, res) {
		// Create a new Todo
		// Uses AJAX request from Angular
		// Model.create is same as 'new' and then .save()
		Todo.create({
			text: req.body.text,
			done: false,
			postedBy: req.body.id
		}, function(err, todo) {
			if (err) {
				res.send(err);
				return;
			}

		// Get all todos of the current user
			Todo.find({
					postedBy: req.body.id
				})
				.populate('postedBy')
				.exec(function(err, todo) {
					console.log(JSON.stringify(todo, null, '\t'));
					res.json(todo);
				});

		});

	});

	app.delete('/api/todos/:todo_id', function(req, res) {
		var userId = req.query.id;

		Todo.remove({
			_id: req.params.todo_id
		}, function(err, todo) {
			if (err) {
				res.send(err);
				return;
			}

			// Get all todos of the current user
			Todo.find({
					postedBy: userId
				})
				.populate('postedBy')
				.exec(function(err, todo) {
					console.log(JSON.stringify(todo, null, '\t'));
					res.json(todo);
				});
		});
	});
	app.get('/profile', auth, ctrlProfile.profileRead);

	app.post('/api/register', ctrlAuth.register);
	app.post('/api/login', ctrlAuth.login);

	// Catch-all Route
	app.get('*', function(req, res) {
		res.sendFile(path.resolve(__dirname + '/../public/index.html'));
	});
};