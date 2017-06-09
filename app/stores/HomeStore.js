import _ from 'lodash'

import alt from '../alt'
import HomeActions from '../actions/HomeActions'

class HomeStore
{
	constructor()
	{
		this.bindActions(HomeActions)
		this.zerg = []
		this.protoss = []
		this.materials = []
	}

	onGetProductsSuccess(data)
	{
		console.log(data[0].category)
		this.zerg = _.filter(data, {category: 'Zerg'})
		this.protoss = _.filter(data, {category: 'Protoss'})
		this.materials = _.filter(data, {category: 'Material'})
	}
}

export default alt.createStore(HomeStore)