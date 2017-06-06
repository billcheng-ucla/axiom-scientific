import React from 'react'
import {Link} from 'react-router'
import NavbarStore from '../stores/NavbarStore'
import NavbarActions from '../actions/NavbarActions'

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
		// NavbarActions.getCharacterCount()
		// let socket = io.connect()
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
		console.log("Searching...")
	}

	render()
	{
		return (
			<nav className='navbar navbar-default navbar-static-top'>
				<div className='container-fluid'>
					<div className='row blue'>
						<div>Axiom-Scientific</div>
						<Link to='/login' className='btn btn-default'>Login</Link>
						<Link to='/signup' className='btn btn-default'>Sign Up</Link>
					</div>
					<div className='row'>
						<form ref='searchForm' className='navbar-form navbar-left animated' onSubmit={this.handleSearch.bind(this)}>
				            <div className='input-group'>
				              <input type='text' className='form-control' placeholder={"Type Item # or keyword"} value={this.state.searchQuery} onChange={NavbarActions.updateSearchQuery} />
				              <span className='input-group-btn'>
				                <button className='btn btn-default' onClick={this.handleSearch.bind(this)}><span className='glyphicon glyphicon-search'></span></button>
				              </span>
				            </div>
						</form>
						<div>My Cart</div>
					</div>
				</div>
			</nav>
		)
	}
}

export default Navbar