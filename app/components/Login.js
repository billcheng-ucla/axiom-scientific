import React from 'react'
import {Link} from 'react-router'
import LoginStore from '../stores/LoginStore'
import LoginActions from '../actions/LoginActions'

class Login extends React.Component
{
	constructor(props)
	{
		super(props)
		this.state = LoginStore.getState()
		this.onChange = this.onChange.bind(this)
	}

	componentDidMount()
	{
		LoginStore.listen(this.onChange)
	}

	componentWillUnmount()
	{
		LoginStore.unlisten(this.onChange)
	}

	onChange(state)
	{
		this.setState(state)
	}

	handleSubmit(e)
	{
		e.preventDefault()
		var user = {
			"email": this.state.email,
			"password": this.state.password
		}
		LoginActions.loginUser(user)
	}

	render()
	{
		return (
			<div>
				<div className='titleDiv'>Login</div>
				<form onSubmit={this.handleSubmit.bind(this)} className='authForm'>
					<input type='email' className='form-control' name='email' onChange={LoginActions.updateUser} value={this.state.email} placeholder='Email' required/>
					<input type='password' className='form-control' name='password' onChange={LoginActions.updateUser} value={this.state.password} placeholder='Password' required/>
					<button type='submit' className='btn btn-primary form-control'>Login</button>
					<div>Dont have an account?</div>
					<Link to='/signup'>Sign Up Here</Link>
				</form>
			</div>
		)
	}
}

export default Login