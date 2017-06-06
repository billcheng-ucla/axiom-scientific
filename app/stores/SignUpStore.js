import React from 'react'
import SignUpActions from '../actions/SignUpActions'
import alt from '../alt'

class SignUpStore
{
	constructor()
	{
		this.bindActions(SignUpActions)
		this.email = ''
		this.fname = ''
		this.lname = ''
		this.password = ''
		this.address = ''
		this.city = ''
		this.st = ''
		this.zip = ''
		this.phone = ''
	}

	onUpdateUser(e)
	{
		this[e.target.name] = e.target.value
	}
}

export default alt.createStore(SignUpStore)