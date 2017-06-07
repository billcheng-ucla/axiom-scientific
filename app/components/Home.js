import React from 'react'
import Tab from './Tab'
import Tabs from './Tabs'
class Home extends React.Component 
{
  render() 
  {
    return (
      <Tabs selected={0}>
      	<Tab label='Zerg'>
      		<p> Placeholder Zerg Product Description </p>
      	</Tab>
      	<Tab label='Protoss'>
      		<p> Placeholder Protoss Product Description </p>
      	</Tab>
      	<Tab label='Materials'>
      		<p> Placeholder Materials Product Description </p>
      	</Tab>
      </Tabs>
    )
  }
}

export default Home