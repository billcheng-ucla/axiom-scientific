import alt from '../alt'

class CartActions
{
	constructor()
	{
		this.generateActions(
			'updateShoppingCart',
			'getCartSuccess'
		)
	}

	getCart()
	{
		if (localStorage.user)
		{
			if (localStorage.cart)
			{
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
				locaStorage.cart = ''
			}
			else
			{
				this.actions.getCartSuccess(JSON.parse(localStorage.user).cart)
			}
		}
		else
		{
			var newCart = localStorage.cart ? JSON.parse(localStorage.cart) : {numberOfItems: 0}
			this.actions.getCartSuccess(newCart)
		}
	}
}

export default alt.createActions(CartActions)