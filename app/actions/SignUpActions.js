import React from 'react'
import alt from '../alt'
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
		})
	}
}

export default alt.createActions(SignUpActions)