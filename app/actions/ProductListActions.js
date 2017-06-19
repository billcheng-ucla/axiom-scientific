import alt from '../alt'

class ProductListActions
{
	constructor()
	{
		this.generateActions(
			'updateItemsWanted',
			'selectVariant'
		)
	}
}

export default alt.createActions(ProductListActions)