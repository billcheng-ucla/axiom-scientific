import React from 'react'
import CartStore from '../stores/CartStore'
import CartActions from '../actions/CartActions'

class Cart extends React.Component
{
	constructor(props)
	{
		super(props)
		this.state = CartStore.getState()
		this.onChange = this.onChange.bind(this)
	}

	componentDidMount()
	{
		CartStore.listen(this.onChange)
		if (localStorage.user)
		{
			this.setState({user: JSON.parse(localStorage.user)})
		}
		CartActions.getCart()
	}

	componentWillUnmount()
	{
		CartStore.unlisten(this.onChange)
	}

	onChange(state)
	{
		this.setState(state)
	}

	hideCart()
	{
		CartActions.updateCartVisible(false)
	}

	showCart()
	{
		CartActions.updateCartVisible(true)
	}

	showCartState()
	{
		var msg = "Cart "
		if (!this.state.cartVisible)
		{
			msg += "in"
		}
		msg += "visible"
		return msg
	}

	render()
	{
		return (
			<div>
				<button className='btn btn-default' onClick={this.showCart}>My Cart {this.state.cart.numberOfItems}</button>
				<div>{this.showCartState.call(this)}</div>
			</div>
		)
	}
}

export default Cart