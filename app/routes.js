import React from 'react'
import {Route} from 'react-router'
import AxiomSci from './components/AxiomSci'
import Home from './components/Home'
import SignUp from './components/SignUp'
import Login from './components/Login'
import Product from './components/Product'
import Checkout from './components/Checkout'
import Search from './components/Search'
import Thanks from './components/Thanks'

export default (
	<Route component={AxiomSci}>
		<Route path='/' component={Home} />
		<Route path='/signup' component={SignUp} />
		<Route path='/login' component={Login} />
		<Route path='/products/:sku' component={Product} />
		<Route path='/checkout' component={Checkout} />
		<Route path='/search' component={Search} />
		<Route path='/thanks' component={Thanks} />
	</Route>
)