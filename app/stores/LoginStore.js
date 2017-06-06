import React from 'react'
import LoginActions from '../actions/LoginActions'
import alt from '../alt'

class LoginStore
{
	constructor()
	{
		this.bindActions(LoginActions)
		this.email = ''
		this.password = ''
	}

	onUpdateUser(e)
	{
		this[e.target.name] = e.target.value
	}
}

export default alt.createStore(LoginStore)