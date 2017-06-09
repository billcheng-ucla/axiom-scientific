import React from 'react'
import Tab from './Tab'
import Tabs from './Tabs'
import HomeStore from '../stores/HomeStore'
import HomeActions from '../actions/HomeActions'
class Home extends React.Component 
{
  constructor(props)
  {
    super(props)
    this.state = HomeStore.getState()
    this.onChange = this.onChange.bind(this)
  }

  componentDidMount()
  {
	HomeStore.listen(this.onChange)
	HomeActions.getProducts()
  }

  componentWillUnmount()
  {
	HomeStore.unlisten(this.onChange)
  }

  onChange(state)
  {
  	this.setState(state)
  }

  render() 
  {
  	function generateProducts(products)
  	{
  		return (
  			products.map((product) => {
  				return (
  					<div key={product.sku}>
  						<div>Name: {product.name}</div>
  						<div>Variant: {product.variant}</div>
  						<div>$ {product.price}</div>
  					</div>
  				)
  			})
  		)
  	}
    return (
      <Tabs selected={0}>
      	<Tab label='Zerg'>
      		<p> Placeholder Zerg Product Description </p>
      		{generateProducts(this.state.zerg)}
      	</Tab>
      	<Tab label='Protoss'>
      		<p> Placeholder Protoss Product Description </p>
      		{generateProducts(this.state.protoss)}
      	</Tab>
      	<Tab label='Materials'>
      		<p> Placeholder Materials Product Description </p>
      		{generateProducts(this.state.materials)}
      	</Tab>
      </Tabs>
    )
  }
}

export default Home