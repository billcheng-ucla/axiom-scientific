import React from 'react'
import ProductStore from '../stores/ProductStore'
import ProductActions from '../actions/ProductActions'
import CartActions from '../actions/CartActions'
class Product extends React.Component
{
	constructor(props)
	{
		super(props)
		this.state = ProductStore.getState()
		this.onChange = this.onChange.bind(this)
	}

	componentDidMount()
	{
		ProductStore.listen(this.onChange)
		ProductActions.getProduct(this.props.params.sku)
	}

	componentWillUnmount()
	{
		ProductStore.unlisten(this.onChange)
	}

	componentDidUpdate(prevProps)
	{
		if (prevProps.params.sku !== this.props.params.sku)
		{
			ProductActions.getProduct(this.props.params.sku)
		}
	}

	updateCart()
	{
		if (this.state.itemsWanted <= this.state.quantity)
		{
			var myItem = {price: this.state.price, name: this.state.name, variant: this.state.variant, itemsWanted: this.state.itemsWanted, sku: this.state.sku}
			CartActions.updateShoppingCart(myItem)
		}
		this.setState({itemsWanted: 0})
	}

	onChange(state)
	{
		this.setState(state)
	}

	render()
	{
		return ( 
			<div className='productContainer'>
				<div className='row' id='productDisplay'>
					<div className='col-lg-4 imgContainer'>
						<img src={'../public/img/' + this.state.image} />
					</div>
					<div className='col-lg-8'>
						<div>Name: {this.state.name}</div>
						<div>Variant: {this.state.variant}</div>
						<div>Description: <p>{this.state.description}</p> </div>
					</div>
				</div>
				<div className='productShelf'>
					<div>Price: ${this.state.price}</div>
					<div>
						<input type='number' value={this.state.itemsWanted} onChange={ProductActions.updateItemsWanted} className='itemswanted'/> (max: {this.state.quantity})
					</div>
					<button className='btn btn-default cartadd' onClick={this.updateCart.bind(this)}>Add to Cart</button>
				</div>
			</div>
		)
	}
}

export default Product