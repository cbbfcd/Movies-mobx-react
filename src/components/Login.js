import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import MovieNav from './MovieNav';


@inject('store')
@observer
export default class Login extends Component{
	constructor(props) {
		super(props);
		this.handleLogin = ::this.handleLogin;
	}

	handleLogin(){
		let { movie } = this.props.store;
		let param = {
			user: this.refs.username.value,
			pwd: this.refs.password.value
		}
		movie.login(param);
	}

	render(){
		let { movie } = this.props.store;
		return(
			<div className='login'>
			{
				movie.isAuthenticated ?
				<MovieNav /> : 
				<div className='login-center'>
					<input type='text' ref='username' placeholder='username...'/>
					<input type='text' ref='password' placeholder='password...'/>
					<a onClick={ this.handleLogin }>Login</a>
				</div>
			}
			</div>
		)
	}
}