import {assign, includes} from 'lodash'
import alt from '../alt'
import ProductActions from '../actions/ProductActions'

class ProductStore
{
	constructor()
	{
		this.bindActions(ProductActions)
		this.name = ''
		this.category = ''
		this.variant = ''
		this.sku = 0
		this.price = 0
		this.image = ''
		this.description = ''
		this.price = 0
		this.quantity = 0
	}

	onGetProductSuccess(data)
	{
		assign(this, data)
	}
}

export default alt.createStore(ProductStore)