import CheckoutActions from '../actions/CheckoutActions'
import alt from '../alt'

class CheckoutStore
{
	constructor()
	{
		this.bindActions(CheckoutActions)
		this.ship = {
			name: '',
			address: ''
		}
		this.bill = {
			name: '',
			address: ''
		}
		this.cart = {}

	}

	onGetCartSuccess(cart)
	{
		this.cart = cart
	}

	onGenerateShip(ship)
	{
		this.ship = ship
	}

	onGenerateBill(bill)
	{
		this.bill = bill
	}

	onUpdateShip(e)
	{
		this.ship[e.target.name] = e.target.value
	}

	onUpdateBill(e)
	{
		this.bill[e.target.name] = e.target.value
	}
}

export default alt.createStore(CheckoutStore)