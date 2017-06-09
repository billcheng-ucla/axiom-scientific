import alt from '../alt'

class HomeActions
{
	constructor()
	{
		this.generateActions(
			'getProductsSuccess',
			'getHomeFail'
		)
	}

	getProducts()
	{
		$.ajax({url: '/api/products/'})
			.done((data) => {
				this.actions.getProductsSuccess(data)
			})
	}
}

export default alt.createActions(HomeActions)