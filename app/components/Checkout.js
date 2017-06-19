import React from 'react'
import CheckoutStore from '../stores/CheckoutStore'
import CheckoutActions from '../actions/CheckoutActions'
import CreditCard from './CreditCard'
import _ from 'lodash'
class Checkout extends React.Component
{
	constructor(props)
	{
		super(props)
		this.state = CheckoutStore.getState()
		this.onChange = this.onChange.bind(this)
	}

	componentDidMount() 
	{
	    CheckoutStore.listen(this.onChange)
	    if (localStorage.user)
	    {
	    	CheckoutActions.getUser()
	    }
	    CheckoutActions.getCart()
    }

    componentWillUnmount()
    {
    	CheckoutStore.unlisten(this.onChange)
    }

	onChange(state)
  	{
  		this.setState(state)
  	}

  	handleSubmit(e)
  	{
  		e.preventDefault()
  		var self = this
  		var total = _.sumBy(_.filter(Object.keys(self.state.cart), function(o) {return o !== "numberOfItems"}), function(sku)
		{
			return self.state.cart[sku].price * self.state.cart[sku].itemsWanted
		})
  		if (localStorage.user)
  		{
	  		$.ajax({
	  			type: 'POST',
	  			url: '/checkout',
	  			data: {
	  				email_address: JSON.parse(localStorage.user).email,
	  				status: 'subscribed',
	  				merge_fields: {
	  					'FNAME': JSON.parse(localStorage.user).fname,
	  					'LNAME': JSON.parse(localStorage.user).lname,
	  					'CART': JSON.stringify(self.state.cart),
	  					'SHIPNAME': self.state.ship.name,
	  					'SHIPADD': self.state.ship.address,
	  					'BILLNAME': self.state.bill.name,
	  					'BILLADD': self.state.bill.address,
	  					'TOTAL': total
	  				},
	  				card: self.state.card
	  			}
	  			
	  		}).done((data) =>
	  		{
	  			$.ajax(
				{
					type: 'PUT',
					url: '/api/users/' + JSON.parse(localStorage.user).email,
					data: {cart: JSON.stringify({numberOfItems: 0})}
				})
	  		})
  		}
  		else
  		{
  			localStorage.cart = ''
  		}
  		console.log(this.state.cart)
  		for (var key in this.state.cart)
  		{
  			
  			if (key !== 'numberOfItems')
  			{
  				var itemsWanted = this.state.cart[key].itemsWanted
  				console.log(itemsWanted)
  				console.log(key)
  				$.ajax({url: '/api/products/' + this.state.cart[key].sku}).done((data) => {
  					console.log(data)
  					$.ajax({
  						type: 'PUT',
  						url: '/api/products/' + data.sku,
  						data: {quantity: data.quantity - itemsWanted}
  					}).done((data) =>
  					{
  						console.log(data)
  					})
  				})
  			}
  			else
  			{
  				location.href = '/thanks'
  				this.state.cart = {}
  			}
  		}
  		//this.state.cart = {}
  		
  	}

  	creditCardChange(e)
  	{
  		CheckoutActions.updateCreditCard(e)
  	}

  	render()
  	{
  		var self = this
  		console.log(this.state.cart)
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
  				<div key={sku}>
  					<div>Name: {self.state.cart[sku].name} </div>
  					<div>Variant: {self.state.cart[sku].variant} </div>
  					<div>Price: {self.state.cart[sku].price} </div>
  					<div>x{self.state.cart[sku].itemsWanted}</div>
  					<div>Total: {self.state.cart[sku].itemsWanted * self.state.cart[sku].price}</div>
  					<button onClick={removeItem}>X</button>
  				</div>
  			)
  		})
  		return (
  			//TODO: list of items
  			<div>
  				<div>
  					{items}
  					<div>{"Grand Total: " + bill}</div>
  				</div>
  				<form onSubmit={this.handleSubmit.bind(this)}>
  					<div id='shipping'>
  						<label>Name of Recipient</label>
  						<input type='text' className='form-control' name='name' onChange={CheckoutActions.updateShip} value={this.state.ship.name} placeholder='Name of Recipient' required/>
  						<label>Shipping Address</label>
  						<input type='text' className='form-control' name='address' onChange={CheckoutActions.updateShip} value={this.state.ship.address} placeholder='Shipping Address' required/>
  					</div>
  					<div id='billing'>
  						<label>Name: (as it appears on the credit card)</label>
  						<input type='text' className='form-control' name='name' onChange={CheckoutActions.updateBill} value={this.state.bill.name} placeholder='Name of Recipient' required/>
  						<label>Address of Recipient</label>
  						<input type='text' className='form-control' name='address' onChange={CheckoutActions.updateBill} value={this.state.bill.address} placeholder='Shipping Address' required/>
  					</div>
  					<CreditCard onChange={this.creditCardChange}/>
  					<button type='submit' className='btn btn-success'>Place Order</button>
  				</form>
  			</div>
  			
  		)
  	}
}

export default Checkout