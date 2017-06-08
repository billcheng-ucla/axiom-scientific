import React from 'react'
import ProductStore from '../stores/ProductStore'
import ProductActions from '../actions/ProductActions'

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

	onChange(state)
	{
		this.setState(state)
	}

	render()
	{
		return ( 
			<div>
				<div>Name: {this.state.name}</div>
				<div>Variant: {this.state.variant}</div>
				<div>$ {this.state.price}</div>
			</div>
		)
	}
}

export default Product