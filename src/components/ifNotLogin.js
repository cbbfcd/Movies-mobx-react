import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Redirect } from 'react-router-dom';
/**
* 验证是否登录
*/
export default function ifNotLogin(Component){

	@inject('store')
	@observer
	class AuthenticatedComponent extends Component{
		constructor(props) {
			super(props);
			this.store = this.props.store;
		}


		render(){
			const { isAuthenticated } = this.store;

			return(
				<div>
					{
						isAuthenticated ? <Component {...this.props} /> : <Redirect from='/top250' to='/'/>
					}
				</div>
			)
		}
	}

	return AuthenticatedComponent;
}