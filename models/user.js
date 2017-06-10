var mongoose = require('mongoose')
var bcrypt = require('bcrypt-nodejs')
var uniqueValidator = require('mongoose-unique-validator')

var userSchema = new mongoose.Schema({
	fname: String,
	lname: String,
	email: {type: String, unique: true},
	password: String,
	address: String,
	city: String,
	st: String,
	zip: Number,
	phone: Number,
	cart: String
})

userSchema.plugin(uniqueValidator)
// userSchema.methods.comparePassword = (password, callback) => {
// 	bcrypt.compare(password, this.password, callback)
// }

// userSchema.pre('save', function saveHook(next)
// {
// 	var user = this
// 	if (!user.isModified('password'))
// 	{
// 		return next()
// 	}
// 	return bcrypt.genSalt((saltError, salt) => {
// 		if (saltError)
// 		{
// 			return next(saltError)
// 		}
// 		return bcrypt.hash(user.password, salt, (hashError, hash) => {
// 			if (hashError)
// 			{
// 				return next(hashError)
// 			}
// 			user.password = hash
// 			return next()
// 		})
// 	})
// })

module.exports = mongoose.model('User', userSchema)