import React from 'react'
import {Link} from 'react-router'
import SignUpStore from '../stores/SignUpStore'
import SignUpActions from '../actions/SignUpActions'
// import TextField from 'material-ui/TextField'
class SignUp extends React.Component
{
	constructor(props)
	{
		super(props)
		this.state = SignUpStore.getState()
		this.onChange = this.onChange.bind(this)
	}

	componentDidMount()
	{
		SignUpStore.listen(this.onChange)
	}

	componentWillUnmount()
	{
		SignUpStore.unlisten(this.onChange)
	}

	onChange(state)
	{
		this.setState(state)
	}

	handleSubmit(e)
	{
		e.preventDefault()
		var user = {
			"fname": this.state.fname,
			"lname": this.state.lname,
			"email": this.state.email,
			"password": this.state.password,
			"address": this.state.address,
			"city": this.state.city,
			"st": this.state.st,
			"zip": this.state.zip,
			"phone": this.state.phone
		}
		console.log(user)
		SignUpActions.createUser(user)
	}

	render() // In the future, inputs probably can b components
	{
		return (
			<form onSubmit={this.handleSubmit.bind(this)}>
				<input type='text' className='form-control' name='fname' onChange={SignUpActions.updateUser} value={this.state.fname} placeholder='First Name' required/>
				<input type='text' className='form-control' name='lname' onChange={SignUpActions.updateUser} value={this.state.lname} placeholder='Last Name' />
				<input type='email' className='form-control' name='email' onChange={SignUpActions.updateUser} value={this.state.email} placeholder='Email' required/>
				<input type='password' className='form-control' name='password' onChange={SignUpActions.updateUser} value={this.state.password} placeholder='Password' required/>
				<input type='text' className='form-control' name='address' onChange={SignUpActions.updateUser} value={this.state.address} placeholder='Address' required/>
				<input type='text' className='form-control' name='city' onChange={SignUpActions.updateUser} value={this.state.city} placeholder='City' required/>
				<select name='st' className='form-control' onChange={SignUpActions.updateUser}>
					<option value=''>Please Select a State</option>
					<option value="AL">Alabama</option>
					<option value="AK">Alaska</option>
					<option value="AZ">Arizona</option>
					<option value="AR">Arkansas</option>
					<option value="CA">California</option>
					<option value="CO">Colorado</option>
					<option value="CT">Connecticut</option>
					<option value="DE">Delaware</option>
					<option value="DC">District Of Columbia</option>
					<option value="FL">Florida</option>
					<option value="GA">Georgia</option>
					<option value="HI">Hawaii</option>
					<option value="ID">Idaho</option>
					<option value="IL">Illinois</option>
					<option value="IN">Indiana</option>
					<option value="IA">Iowa</option>
					<option value="KS">Kansas</option>
					<option value="KY">Kentucky</option>
					<option value="LA">Louisiana</option>
					<option value="ME">Maine</option>
					<option value="MD">Maryland</option>
					<option value="MA">Massachusetts</option>
					<option value="MI">Michigan</option>
					<option value="MN">Minnesota</option>
					<option value="MS">Mississippi</option>
					<option value="MO">Missouri</option>
					<option value="MT">Montana</option>
					<option value="NE">Nebraska</option>
					<option value="NV">Nevada</option>
					<option value="NH">New Hampshire</option>
					<option value="NJ">New Jersey</option>
					<option value="NM">New Mexico</option>
					<option value="NY">New York</option>
					<option value="NC">North Carolina</option>
					<option value="ND">North Dakota</option>
					<option value="OH">Ohio</option>
					<option value="OK">Oklahoma</option>
					<option value="OR">Oregon</option>
					<option value="PA">Pennsylvania</option>
					<option value="RI">Rhode Island</option>
					<option value="SC">South Carolina</option>
					<option value="SD">South Dakota</option>
					<option value="TN">Tennessee</option>
					<option value="TX">Texas</option>
					<option value="UT">Utah</option>
					<option value="VT">Vermont</option>
					<option value="VA">Virginia</option>
					<option value="WA">Washington</option>
					<option value="WV">West Virginia</option>
					<option value="WI">Wisconsin</option>
					<option value="WY">Wyoming</option>
				</select>
				<input type='text' className='form-control' name='zip' onChange={SignUpActions.updateUser} value={this.state.zip} placeholder='Zip Code' required/>
				<input type='tel' className='form-control' name='phone' onChange={SignUpActions.updateUser} value={this.state.phone} placeholder='Phone Number' required/>
				<button type='submit' className='btn btn-primary'>Create Account</button>
			</form>
		)
	}
}

export default SignUp