import React from 'react'
import alt from '../alt'
import LoginActions from './LoginActions'
class SignUpActions
{
	constructor()
	{
		this.generateActions(
			'updateUser'
		)
	}

	createUser(user)
	{
		$.ajax(
		{
			type: 'POST',
			url: '/api/users',
			data: user
		}).done((data) =>
		{
			var user = {
				"email": data.email,
				"password": data.password
			}
			LoginActions.loginUser(user)
		})
	}
}

var loginSuccess = function(data)
{
	var user = data
	user.cart = JSON.parse(user.cart)
	localStorage.setItem("user", JSON.stringify(user))
	location.href = '/'
}

export default alt.createActions(SignUpActions)