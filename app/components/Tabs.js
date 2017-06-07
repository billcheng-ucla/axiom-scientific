import React from 'react'

class Tabs extends React.Component
{
	constructor(props)
	{
		super(props)
		//this.displayName = 'Tabs'
		this.state = {selected: this.props.selected}
		//this.onChange = this.onChange.bind(this)

	}

	// onChange(state)
	// {
	// 	this.setState(state)
	// }

	_renderContent()
	{
		return (
			<div className='tabs_content'>
				{this.props.children[this.state.selected]}
			</div>
		)
	}

	_renderTitles()
	{
		function labels(child, index)
		{
			var activeClass = this.state.selected === index ? 'active' : ''
			return (
				<li key={index}>
					<a href='#'
						className={activeClass}
						onClick={this.handleClick.bind(this, index)}>
						{child.props.label}
					</a>
				</li>
			)
		}
		return (
			<ul className='tabs_labels'>
				{this.props.children.map(labels.bind(this))}
			</ul>
		)
	}

	handleClick(index, event)
	{
		event.preventDefault()
		this.setState({selected: index})
	}

	render()
	{
		return (
			<div className='tabs'>
				{this._renderTitles()}
				{this._renderContent()}
			</div>
		)
	}
}

export default Tabs