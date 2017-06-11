var Product = require('./models/product')
var mongoose = require('mongoose')
var config = require('./config')
mongoose.connect(config.database);
mongoose.connection.on('error', function() {
  console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?');
})
var inventory = [
{
	category: "Zerg",
	name: "Zergling",
	sku: 1,
	price: 350,
	variant: "Normal",
	image: "",
	description: "",
	quantity: 2000
},
{
	category: "Zerg",
	name: "Zergling",
	sku: 2,
	price: 600,
	variant: "Raptor",
	image: "",
	description: "",
	quantity: 500
},
{
	category: "Zerg",
	name: "Zergling",
	sku: 3,
	price: 500,
	variant: "Swarmling",
	image: "",
	description: "",
	quantity: 3000
},
{
	category: "Zerg",
	name: "Roach",
	sku: 4,
	price: 800,
	variant: "Normal",
	image: "",
	description: "",
	quantity: 300
},
{
	category: "Zerg",
	name: "Roach",
	sku: 5,
	price: 1000,
	variant: "Corpser",
	image: "",
	description: "",
	quantity: 100
},
{
	category: "Zerg",
	name: "Roach",
	sku: 6,
	price: 1000,
	variant: "Vile",
	image: "",
	description: "",
	quantity: 80
},
{
	category: "Zerg",
	name: "Larvae Cup",
	sku: 7,
	price: 100,
	variant: "20 pcs",
	image: "",
	description: "",
	quantity: 150
},
{
	category: "Zerg",
	name: "Larvae Cup",
	sku: 8,
	price: 230,
	variant: "50 pcs",
	image: "",
	description: "",
	quantity: 40
},
{
	category: "Zerg",
	name: "Larvae Cup",
	sku: 9,
	price: 800,
	variant: "200 pcs",
	image: "",
	description: "",
	quantity: 55
},
{
	category: "Protoss",
	name: "Stasis Cell",
	sku: 10,
	price: 1200,
	variant: "1 cell",
	image: "",
	description: "",
	quantity: 30
},
{
	category: "Protoss",
	name: "Stasis Cell",
	sku: 11,
	price: 5800,
	variant: "5 cells",
	image: "",
	description: "",
	quantity: 5
},
{
	category: "Protoss",
	name: "Stasis Cell",
	sku: 12,
	price: 10000,
	variant: "10 cells",
	image: "",
	description: "",
	quantity: 4
},
{
	category: "Protoss",
	name: "Particle Beam",
	sku: 13,
	price: 8000,
	variant: "Apparatus + Energy Cell",
	image: "",
	description: "",
	quantity: 50
},
{
	category: "Protoss",
	name: "Particle Beam",
	sku: 14,
	price: 16000,
	variant: "Apparatus + 5 Energy Cells",
	image: "",
	description: "",
	quantity: 30
},
{
	category: "Protoss",
	name: "Particle Beam",
	sku: 15,
	price: 26000,
	variant: "Apparatus + 10 Energy Cells",
	image: "",
	description: "",
	quantity: 10
},
{
	category: "Protoss",
	name: "Light Armor Suit",
	sku: 16,
	price: 10000,
	variant: "1 set",
	image: "",
	description: "",
	quantity: 10
},
{
	category: "Protoss",
	name: "Light Armor Suit",
	sku: 17,
	price: 28000,
	variant: "3 set",
	image: "",
	description: "",
	quantity: 10
},
{
	category: "Protoss",
	name: "Light Armor Suit",
	sku: 18,
	price: 45000,
	variant: "5 set",
	image: "",
	description: "",
	quantity: 10
},
{
	category: "Material",
	name: "Mineral",
	sku: 19,
	price: 3000,
	variant: "1 kg",
	image: "",
	description: "",
	quantity: 1000
},
{
	category: "Material",
	name: "Mineral",
	sku: 20,
	price: 14000,
	variant: "5 kg",
	image: "",
	description: "",
	quantity: 1000
},
{
	category: "Material",
	name: "Mineral",
	sku: 21,
	price: 27000,
	variant: "10 kg",
	image: "",
	description: "",
	quantity: 1000
},
{
	category: "Material",
	name: "Refined Vespene Gas",
	sku: 22,
	price: 10000,
	variant: "1 L",
	image: "",
	description: "",
	quantity: 1000
},
{
	category: "Material",
	name: "Refined Vespene Gas",
	sku: 23,
	price: 48000,
	variant: "5 L",
	image: "",
	description: "",
	quantity: 1000
},
{
	category: "Material",
	name: "Refined Vespene Gas",
	sku: 24,
	price: 95000,
	variant: "10 L",
	image: "",
	description: "",
	quantity: 1000
}]

var User = require('./models/user')
User.remove({}, function(err, users){})

Product.remove({}, function(err, products)
{
	if(err)
	{
		console.log("Removal Error", err)
	}
	else
	{
		console.log("Products Removed")
		Product.create(inventory, function(err, products)
		{
			if (err)
			{
				return console.log('err', err)
			}
			console.log("created", products.length, "products")
			process.exit()
		})
	}
})
