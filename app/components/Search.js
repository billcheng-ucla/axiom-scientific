import React from 'react'
import SearchActions from '../actions/SearchActions'
import SearchStore from '../stores/SearchStore'
import {Link} from 'react-router'

class Search extends React.Component
{
	constructor(props)
	{
		super(props)
		this.state = SearchStore.getState()
		this.onChange = this.onChange.bind(this)
	}

	onChange(state)
	{
		this.setState(state)
	}

	componentDidMount()
	{
		SearchStore.listen(this.onChange)
		SearchActions.getProducts(this.props.location.query.req)
	}

	componentWillUnmount()
	{
		SearchStore.unlisten(this.onChange)
	}

	componentDidUpdate(prevQuery)
	{
		console.log(this.props)
		console.log(prevQuery)
		if (prevQuery.location.query.req !== this.props.location.query.req)
		{
			SearchActions.getProducts(this.props.location.query.req)
		}
	}

	render()
	{
		var results = this.state.products.map(function(product) {
			return <Link to={'/products/' + product.sku} key={product.sku}>{product.name + ": " + product.variant}</Link>
		})
		return (
			<div>
				{(results.length > 0 ? results : "No products found")}
			</div>
		)
	}
}

export default Search