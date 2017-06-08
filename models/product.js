var mongoose = require('mongoose')

var productSchema = new mongoose.Schema(
{
	category: String,
	name: String,
	sku: Number,
	price: Number,
	variant: String,
	image: String,
	description: String,
	quantity: Number
})

module.exports = mongoose.model('Product', productSchema)