import React from 'react'
import {Link} from 'react-router'

class Thanks extends React.Component
{
	constructor(props)
	{
		super(props)
	}

	render()
	{
		return (
			<div>
				Thank you for shopping at Axiom-Scientific
				<Link to='/'>Return to Home Page</Link>
			</div>
		)
	}
}

export default Thanks