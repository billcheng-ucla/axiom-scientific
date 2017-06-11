import alt from '../alt'
import {assign} from 'lodash'

class NavbarActions
{
	constructor()
	{
		this.generateActions(
			'updateSeachQuery',
		)
	}
}

export default alt.createActions(NavbarActions)