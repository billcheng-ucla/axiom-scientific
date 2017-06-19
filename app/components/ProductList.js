import React from 'react'
import ProductListStore from '../stores/ProductListStore'
import ProductListActions from '../actions/ProductListActions'

class ProductList extends React.Component
{
	constructor(props)
	{
		console.log(props)
		super(props)
		this.state = ProductListStore.getState()
		this.onChange = this.onChange.bind(this)
	}

	onChange(state)
	{
		this.setState(state)
	}

	componentDidMount()
	{
		ProductListStore.listen(this.onChange)
		this.setState({product: this.props.products[0]})
	}

	componentWillUnmount()
	{
		ProductListStore.unlisten(this.onChange)
	}

	updateCart()
	{

	}

	selectVariant(e)
	{
		this.setState({product: JSON.parse(e.target.value)})
	}

	render()
	{
		return (
			<div>
				<div>{this.props.name}</div>
				<div>Variant: {this.state.product.variant}</div>
				<div>Description: <p>{this.state.product.description}</p></div>
				<div className='productShelf'>
					<div>Price: ${this.state.product.price}</div>
					<div>
						<input type='number' value={this.state.itemsWanted} onChange={this.updateItemsWanted} className='itemswanted'/> (max: {this.state.quantity})
					</div>
					<button className='btn btn-default cartadd' onClick={this.updateCart.bind(this)}>Add to Cart</button>
				</div>
				<select name='productname' onChange={this.selectVariant.bind(this)}>
					{this.props.products.map(function(product) {
						console.log(product.sku)
						return (
							<option key={product.sku} value={JSON.stringify(product)}>{product.variant}</option>
						)
					})}
				</select>
			</div>
		)
	}
}

export default ProductList