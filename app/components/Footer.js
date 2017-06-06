import React from 'react'
import {Link} from 'react-router'
import FooterStore from '../stores/NavbarStore'
import FooterActions from '../actions/NavbarActions'

class Footer extends React.Component
{
	constructor(props)
	{
		super(props)
		this.state = FooterStore.getState()
		this.onChange = this.onChange.bind(this)
	}

	componentDidMount() 
	{
	    FooterStore.listen(this.onChange);
    }

    componentWillUnmount() 
    {
    	FooterStore.unlisten(this.onChange);
  	}

  	onChange(state)
  	{
  		this.setState(state)
  	}

  	render()
  	{
  		var links = ["About Us", "Privacy Policy", "Terms of Use", "Careers", "Contact", "Help"].map((link) => {
  			return (
  				<div className='col-lg-2' key={link}>
  					<Link to='#'>
  						{link}
  					</Link>
  				</div>
  			)
  		})

  		return (
  			<footer>
  				<div className="container-fluid grey">
  					<div className="row">
  						{links}
  					</div>
  					<div className="row">
  						Axiom-Scientific. All rights reserved.
  					</div>
  				</div>
  			</footer>
  		)
  	}
}

export default Footer