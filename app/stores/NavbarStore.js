import alt from '../alt'
import NavbarActions from '../actions/NavbarActions'

class NavbarStore
{
	constructor()
	{
		this.bindActions(NavbarActions)
		this.cartItems = 0
	}
}

export default alt.createStore(NavbarStore)