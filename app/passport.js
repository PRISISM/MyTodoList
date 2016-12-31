/*
 Strategy for Passport

 Local: Write Mongoose query on User model. Find user with username, and then call verifyPassword.
 */

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

passport.use(new LocalStrategy(
	function(username, password, done) {
		User.findOne({username: username}, function(err, user) {
			if (err) {
				return done(err);
			}
			// Return if user not found in database
			if (!user) {
				return done(null, false, {
					message: 'User not found'
				});
			}
			// Return if password is wrong
			if (!user.validPassword(password)) {
				return done(null, false, {
					message: 'Password is wrong'
				});
			}

			// Correct credentials
			
			return done(null, user);

		});

}));