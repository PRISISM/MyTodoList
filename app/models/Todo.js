var mongoose = require('mongoose');
var User = require('./User');

module.exports = mongoose.model('Todo', {
	// Schema
	text : {
		type: String,
		default: ''
	},
	done : Boolean,
	postedBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}
});