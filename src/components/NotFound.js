import React, { Component } from 'react'
import { observer} from 'mobx-react';


@observer
export default class NotFound extends Component{
	render(){
		return(
			<div className='class-notfound'>
				<h1>404</h1>
			</div>
		)
	}
}