import React from 'react'
import {Link} from 'react-router'
import NavbarStore from '../stores/NavbarStore'
import NavbarActions from '../actions/NavbarActions'
import Cart from './Cart'
import CartActions from '../actions/CartActions'

class Navbar extends React.Component
{
	constructor(props)
	{
		super(props)
		this.state = NavbarStore.getState()
		this.onChange = this.onChange.bind(this)
	}

	componentDidMount()
	{
		NavbarStore.listen(this.onChange)
		if (localStorage.user)
		{
			this.setState({user: JSON.parse(localStorage.user)})
		}
	}

	componentWillUnmount()
	{
		NavbarStore.unlisten(this.onChange)
	}

	onChange(state)
	{
		this.setState(state)
	}

	handleSearch()
	{
		console.log(this.state.searchQuery)
		this.setState({searchQuery: ''})
	}

	logout()
	{
		$.ajax(
		{
			type: 'PUT',
			url: '/api/users/' + JSON.parse(localStorage.user).email,
			data: {cart: localStorage.cart ? localStorage.cart : JSON.stringify({numberOfItems: 0})}
		})
		localStorage.cart = ''
		localStorage.user = ''
		this.setState({user: ''})
		CartActions.getCart()
	}

	render()
	{
		var loggedIn = function()
		{
			return (this.state.user) ? <div className='welcome yellow-text'>Hello {this.state.user.fname} <button className='btn btn-default' id='logout' onClick={this.logout.bind(this)}>Logout</button></div> : (<div className='welcome'><Link to='/login' className='btn btn-default' id='login'>Login</Link>
						<Link to='/signup' className='btn btn-default' id='signup'>Sign Up</Link></div>)
		}
		loggedIn.bind(this)
		return (
			<nav className='navbar navbar-default navbar-static-top'>
				<div className='container-fluid'>
					<div className='row blue'>
						<div id='title'>
							<Link to='/' className='yellow-text' >Axiom-Scientific</Link>
							<button className='btn btn-default verticalAlignHelper' id='logout' onClick={this.logout.bind(this)}>Logout</button>
						</div>
						{loggedIn.call(this)}
					</div>
					<div className='row'>
						<form ref='searchForm' className='navbar-form navbar-left search animated' onSubmit={this.handleSearch.bind(this)}>
				            <div className='input-group'>
				              <input type='text' className='form-control' placeholder={"Type Item # or keyword"} value={this.state.searchQuery} onChange={NavbarActions.updateSearchQuery} />
				              <span className='input-group-btn'>
				                <Link to={'/search?req=' + this.state.searchQuery} className='btn btn-default' onClick={this.handleSearch.bind(this)}><span className='glyphicon glyphicon-search'></span></Link>
				              </span>
				            </div>
						</form>
						<Cart />
					</div>
				</div>
			</nav>
		)
	}
}

export default Navbar