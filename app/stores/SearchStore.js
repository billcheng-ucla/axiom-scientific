import alt from '../alt'
import SearchActions from '../actions/SearchActions'

class SearchStore
{
	constructor()
	{
		this.bindActions(SearchActions)
		this.products = []
	}

	onGetSingleProductSuccess(product)
	{
		this.products = [product]
	}

	onGetProductsSuccess(products)
	{
		this.products = products
	}
}

export default alt.createStore(SearchStore)