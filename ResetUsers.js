var User = require('./models/user')
var mongoose = require('mongoose')
var config = require('./config')
mongoose.connect(config.database);
mongoose.connection.on('error', function() {
  console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?');
})

var abc = {
	email: 'a@b.com',
	password: '12345',
	fname: 'a',
	lname: 'b',
	address: '1976 Waycross Rd',
	city: 'Fremont',
	st: 'CA',
	zip: 94539,
	phone: 5109364185,
	cart: JSON.stringify({numberOfItems: 0})
}

User.remove({}, function(err, users)
{
	if(err)
	{
		console.log("Removal Error", err)
	}
	else
	{
		console.log("Users Removed")
		User.create(abc, function(err, user)
		{
			if (err)
			{
				return console.log('err', err)
			}
			console.log(user)
			process.exit()
		})
	}
	//process.exit()
})

