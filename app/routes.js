import React from 'react'
import {Route} from 'react-router'
import AxiomSci from './components/AxiomSci'
import Home from './components/Home'
import SignUp from './components/SignUp'
import Login from './components/Login'

export default (
	<Route component={AxiomSci}>
		<Route path='/' component={Home} />
		<Route path='/signup' component={SignUp} />
		<Route path='/login' component={Login} />
	</Route>
)