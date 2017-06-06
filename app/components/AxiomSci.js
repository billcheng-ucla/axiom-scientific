import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

class AxiomSci extends React.Component
{
	render()
	{
		return(
			<div>
				<Navbar history={this.props.history}/>
				{this.props.children}
				<Footer />
			</div>
		)
	}
}

export default AxiomSci