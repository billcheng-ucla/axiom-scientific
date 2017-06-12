import alt from '../alt'
import _ from 'lodash'
class SearchActions
{
	constructor()
	{
		this.generateActions(
			'getSingleProductSuccess',
			'getProductsSuccess'
		)
	}

	getProducts(query)
	{
		if (parseInt(query))
		{
			$.ajax({
				url: "/api/products/" + query,
			}).done((product) =>
			{
				this.actions.getSingleProductSuccess(product)
			})
		}
		else
		{
			$.ajax({
				url: "/api/products"
			}).done((products) =>
			{
				console.log(products)
				var variants = _.filter(products, function(product)
				{
					return product.variant.toLowerCase().includes(query.toLowerCase())
				})
				var names = _.filter(products, function(product)
				{
					return product.name.toLowerCase().includes(query.toLowerCase())
				})
				this.actions.getProductsSuccess(names.concat(variants))
			})
		}
	}
}

export default alt.createActions(SearchActions)