import alt from '../alt'
import NavbarActions from '../actions/NavbarActions'

class NavbarStore
{
	constructor()
	{
		this.bindActions(NavbarActions)
		this.searchQuery = ''
	}

	onUpdateSearchQuery(e)
	{
		this.searchQuery = e.target.value
	}

}

export default alt.createStore(NavbarStore)