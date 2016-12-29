var mongoose = require('mongoose');

module.exports = mongoose.model('Todo', {
	// Schema
	text : {
		type: String,
		default: ''
	},
	done : Boolean
});