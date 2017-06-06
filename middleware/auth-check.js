var jwt = require('jsonwebtoken')
var User = require('../models/user')
var config = require('../config')

module.exports = (req, res, next) => {
	if (!req.headers.authorization) {
		return res.status(410).end()
	}

	var token = req.headers.authorization.split(' ')[1]
	return jwt.verify(token, config.jwtSecret, (err, decoded) => {
		if (err)
		{
			return res.status(401).end()
		}

		var userId = decoded.sub
		return User.findById(userId, (userErr, user) => {
			if (userErr || !user)
			{
				return res.status(410).end()
			}
			return next()
		})
	})
}