import {assign, includes} from 'lodash'
import alt from '../alt'
import ProductListActions from '../actions/ProductListActions'

class ProductListStore
{
	constructor()
	{
		this.bindActions(ProductListActions)
		this.product = {}
		this.itemsWanted = 0
	}

	onUpdateItemsWanted(e)
	{
		this.itemsWanted = parseInt(e.target.value)
	}

	onSelectVariant(e)
	{
		console.log(JSON.parse(e.target.value))
		this.product = JSON.parse(e.target.value)
	}
}

export default alt.createStore(ProductListStore)