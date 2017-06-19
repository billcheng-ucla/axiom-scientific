import React from 'react'
import Tab from './Tab'
import Tabs from './Tabs'
import HomeStore from '../stores/HomeStore'
import HomeActions from '../actions/HomeActions'
import {Link} from 'react-router'
import ProductList from './ProductList'
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
  						<Link to={'/products/' + product.sku}>Variant: {product.variant}</Link>
  						<div>$ {product.price}</div>
  					</div>
  				)
  			})
  		)
  	}

    function generateProductLists(products)
    {
      console.log(products)
      var productTypes = {}
      for (var product of products)
      {
        console.log(product)
        if(!productTypes[product.name])
        {
          productTypes[product.name] = []
        }
        productTypes[product.name].push(product)
      }
      console.log(productTypes)
      console.log(Object.keys(productTypes))
      return (
        Object.keys(productTypes).map((productType) => {
          console.log(<ProductList name={productType} products={productTypes[productType]} />)
          return (<ProductList name={productType} products={productTypes[productType]} key={productType} />)
        })
      )
    }
    return (
      <Tabs selected={0}>
      	<Tab label='Zerg'>
      		<p> Placeholder Zerg Product Description </p>
      		{generateProductLists(this.state.zerg)}
      	</Tab>
      	<Tab label='Protoss'>
      		<p> Placeholder Protoss Product Description </p>
      		{generateProductLists(this.state.protoss)}
      	</Tab>
      	<Tab label='Materials'>
      		<p> Placeholder Materials Product Description </p>
      		{generateProductLists(this.state.materials)}
      	</Tab>
      </Tabs>
    )
  }
}

export default Home