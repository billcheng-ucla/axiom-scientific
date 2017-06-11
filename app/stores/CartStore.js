import alt from '../alt'
import CartActions from '../actions/CartActions'

class CartStore 
{
	constructor()
	{
		this.bindActions(CartActions)
		this.cart = {}
		this.cartVisible = false
	}

	onGetCartSuccess(cart)
	{
		this.cart = cart
		//localStorage.cart = JSON.stringify(cart)
	}

	onUpdateShoppingCart(item)
	{
		console.log(item)
		console.log(this)
		if (this.cart[item.sku])
		{
			console.log(this.cart[item.sku])
			this.cart[item.sku].itemsWanted += parseInt(item.itemsWanted)
		}
		else
		{
			this.cart[item.sku] = item
		}
		this.cart.numberOfItems += parseInt(item.itemsWanted)
		localStorage.cart = JSON.stringify(this.cart)
		console.log(localStorage.cart)
	}

	onUpdateCartVisible(cartVisible)
	{
		this.cartVisible = cartVisible
	}
}
export default alt.createStore(CartStore)