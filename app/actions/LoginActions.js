import React from 'react'
import alt from '../alt'
import CartActions from './CartActions'
class LoginActions
{
	constructor()
	{
		this.generateActions(
			'updateUser'
		)
	}

	loginUser(user)
	{
		$.ajax(
		{
			type: 'POST',
			url: '/login',
			data: user,
			success: loginSuccess
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
export default alt.createActions(LoginActions)