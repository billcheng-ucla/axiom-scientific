import alt from '../alt'
import {assign} from 'lodash'

class NavbarActions
{
	constructor()
	{
		this.generateActions(
			'updateShoppingCart',
			'updateSeachQuery',
		)
	}
}

export default alt.createActions(NavbarActions)