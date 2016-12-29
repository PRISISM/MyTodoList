var Todo = require('./models/Todo');

module.exports = function(app) {

	app.get('/api/todos', function(req, res) {
		// Find all todos
		Todo.find(function(err, todos) {
			if (err) {
				res.send(err);
				return;
			}

			res.json(todos);
		});
	});

	app.post('/api/todos', function(req, res) {
		// Create a new Todo
		// Uses AJAX request from Angular
		// Model.create is same as 'new' and then .save()
		Todo.create({
			text: req.body.text,
			done: false
		}, function(err, todo) {
			if (err) {
				res.send(err);
				return;
			}

			// get all todos after creating another
			Todo.find(function(err, todos) {
				if (err) {
					res.send(err);
					return;
				}
				res.json(todos);

			});
		});

	});

	app.delete('/api/todos/:todo_id', function(req, res) {
		Todo.remove({
			_id: req.params.todo_id
		}, function(err, todo) {
			if (err) {
				res.send(err);
				return;
			}

			// get all todos after removing
			Todo.find(function(err, todos) {
				if (err) {
					res.send(err);
					return;
				}
				res.json(todos);
			});
		});
	});

	// Catch-all Route
	app.get('*', function(req, res) {
		res.sendFile('./public/index.html', {
			root: __dirname
		});
	});
};