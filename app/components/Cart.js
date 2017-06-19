import React from 'react'
import CartStore from '../stores/CartStore'
import CartActions from '../actions/CartActions'
import {Link} from 'react-router'
import _ from 'lodash'

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

	render()
	{
		console.log(this.state.cartVisible)
		var self = this
		var bill = _.sumBy(_.filter(Object.keys(self.state.cart), function(o) {return o !== "numberOfItems"}), function(sku)
		{
			console.log(self.state.cart[sku])
			return self.state.cart[sku].price * self.state.cart[sku].itemsWanted
		})
		var items = _.filter(Object.keys(self.state.cart), function(o) {return o !== "numberOfItems"}).map((sku) =>
		{
			function removeItem()
			{
				console.log(sku)
				self.state.cart.numberOfItems -= self.state.cart[sku].itemsWanted
				delete self.state.cart[sku]
				localStorage.cart = JSON.stringify(self.state.cart)
				self.setState({cart: self.state.cart})
			}
			return (
				<div key={sku} className='cartItem'>
					<div>Name: {self.state.cart[sku].name} </div>
					<div>Variant: {self.state.cart[sku].variant} </div>
					<div>Price: ${self.state.cart[sku].price} x {self.state.cart[sku].itemsWanted}</div>
					<div>Total: ${self.state.cart[sku].itemsWanted * self.state.cart[sku].price}</div>
					<button onClick={removeItem} className='itemRemoval btn btn-default'>Remove Item</button>
				</div>
			)
		})
		return (
			<div id='cart'>
				<button className='btn btn-default' onClick={this.showCart} disabled={bill > 0 ? '' : 'disabled'}><i className='fa fa-shopping-cart' /> {this.state.cart.numberOfItems}</button>
				<div className={"shoppingList " + ((this.state.cartVisible && bill > 0) ? "cartActive" : "cartInactive")}>
					<button onClick={this.hideCart} id='cartHide' className='btn btn-default'>&times;</button>
					{items}
					<div>{"Grand Total: $" + bill}</div>
					<Link to='/checkout' className='btn btn-primary' onClick={this.hideCart}>Checkout</Link>
				</div>
			</div>
		)
	}
}

export default Cart