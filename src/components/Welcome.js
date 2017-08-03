import React, { Component } from 'react'
import { observer, inject } from 'mobx-react';

@inject('store')
@observer
export default class extends Component{
	componentWillMount() {
		this.props.store.movie.clearAllData();
	}
	render(){
		return(
			<div className='welcome'>
				<img className='img-style' src={require("ASSET/images/1.jpg")}/>
			</div>
		)
	}
}