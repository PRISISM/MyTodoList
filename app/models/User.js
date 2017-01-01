var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	hash: String,
	salt: String
	// todos: [todoSchema]

	// Here add Todos?

});

userSchema.methods.setPassword = function(password) {
	this.salt = crypto.randomBytes(16).toString('hex');
	this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

userSchema.methods.validPassword = function(password) {
	var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
	return this.hash === hash;
};

// Generates a JWT (think security pass) with the users data
// exp is the expiry date
userSchema.methods.generateJwt = function() {
	var expiry = new Date();
	expiry.setDate(expiry.getDate() + 7);

	return jwt.sign({
		_id: this._id,
		username: this.username,
		name: this.name,
		exp: parseInt(expiry.getTime() / 1000),
	}, process.env.secret);
};

mongoose.model('User', userSchema);

var todoSchema = new mongoose.Schema({
	text: {
		type: String,
		default: ''
	},
	done: Boolean,
	postedBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}
});