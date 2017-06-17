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
		this.card = {
			number: '',
			exp_month: '',
			exp_year: '',
			cvc: ''
		}

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

	onUpdateCreditCard(e)
	{
		if(e.target.name === "expiration")
		{
			this.card.exp_month = e.target.value.split('/')[0]
			this.card.exp_year = e.target.value.split('/')[1]
		}
		else
		{
			this.card[e.target.name] = e.target.value
		}
		console.log(this.card)
		
	}
}

export default alt.createStore(CheckoutStore)