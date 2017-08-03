import React, { Component } from 'react'
import Login from './Login'
import { observer, inject } from 'mobx-react';


@observer
export default class TopBar extends Component{
	constructor(props) {
		super(props);
	}

	render(){
		return(
			<div className='top-bar'>
				<h2>MOVIES</h2>
				<Login />
			</div>
		)
	}
}