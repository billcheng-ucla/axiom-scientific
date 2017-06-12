import alt from '../alt'
import {assign} from 'lodash'

class NavbarActions
{
	constructor()
	{
		this.generateActions(
			'updateSearchQuery',
		)

	}
}

export default alt.createActions(NavbarActions)