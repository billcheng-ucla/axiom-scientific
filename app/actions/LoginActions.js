import React from 'react'
import alt from '../alt'
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
	console.log(data)
	localStorage.setItem("user", JSON.stringify(data))
	console.log(data.email)
	console.log(JSON.parse(localStorage.user).email)
	location.href = '/'
}

export default alt.createActions(LoginActions)