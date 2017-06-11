import alt from '../alt'

class ProductActions
{
	constructor()
	{
		this.generateActions(
			'getProductSuccess',
			'getProductFail',
			'updateItemsWanted'
		)
	}

	getProduct(sku)
	{
		$.ajax({url: '/api/products/' + sku})
			.done((data) => {
				this.actions.getProductSuccess(data)
			})
	}
}

export default alt.createActions(ProductActions)