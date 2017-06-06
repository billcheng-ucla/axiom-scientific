var jwt = require('jsonwebtoken')
var User = require('../models/user')
var PassportLocalStrategy = require('passport-local').Strategy
var config = require('../config')

module.exports = new PassportLocalStrategy(
{
	usernameField: 'email',
	passwordField: 'password',
	session: false,
	passReqToCallback: true
}, (req, email, password, done) => {
	const userData = {
		email: email.trim(),
		password: password.trim()
	}

	return User.findOne({email: userData.email}, (err, user) => {
		if (err)
		{
			return done(err)
		}

		if (!user)
		{
			var error = new Error('Incorrect email or password')
			error.name = 'IncorrectCredentialsEror'

			return done)error
		}

		return user.comparePassword(userData.password, (passwordErr, isMatch) => {
			if (err)
			{
				return done(err)
			}

			if (!isMatch)
			{
				var error = new Error('Incorrect email or password')
				error.name = 'IncorrectCredentialsError'
				return done(error)
			}
			var payload = {
				sub: user._id
			}

			var token = jwt.sign(payload, config.jwtSecret)
			var data = {
				name: user.name
			}

			return done(null, token, data)
		})
	})
})