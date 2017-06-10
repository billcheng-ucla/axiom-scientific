import alt from '../alt'

class CartActions
{
	constructor()
	{
		this.generateActions(
			'updateShoppingCart',
			'getCartSuccess',
			'updateCartVisible',
		)
	}

	getCart()
	{
		if (localStorage.user)
		{
			console.log("User Logged In")
			if (localStorage.cart)
			{
				console.log("Data stored in session")
				newCart = {}
				for (var key in JSON.parse(localStorage.user).cart) 
				{
					if (JSON.parse(localStorage.cart)[key])
					{
						newCart[key] =  JSON.parse(localStorage.user).cart[key] + JSON.parse(localStorage.cart)[key]
					}
					else
					{
						newCart[key] = JSON.parse(localStorage.user).cart[key]
					}
				}
				for (var key in JSON.parse(localStorage.cart))
				{
					if (!JSON.parse(localStorage.user).cart[key])
					{
						newCart[key] = JSON.parse(localStorage.cart)[key]
					}
				}
				this.actions.getCartSuccess(newCart)
				$.ajax(
				{
					type: 'PUT',
					url: '/api/users/' + JSON.parse(localStorage.user).email,
					data: {cart: localStorage.cart}
				})
				localStorage.cart = ''
			}
			else
			{
				console.log("No data stored in session")
				this.actions.getCartSuccess(JSON.parse(localStorage.user).cart)
			}
		}
		else
		{
			console.log("No User Logged In")
			var newCart = localStorage.cart ? JSON.parse(localStorage.cart) : {numberOfItems: 0}
			this.actions.getCartSuccess(newCart)
		}
	}
}

export default alt.createActions(CartActions)