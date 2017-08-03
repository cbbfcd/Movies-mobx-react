import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router-dom';
import ActiveLink from 'UTIL/ActiveLink'

@inject('store')
@observer
export default class MovieNav extends Component {
	constructor(props) {
		super(props);
		this.handleLogout =::this.handleLogout;
	}

	handleLogout(){
		this.props.store.movie.logout();
	}

	render(){
		return(
			<div className='movie-nar-layout'>
				<div className='movie-nar'>
					<ActiveLink
						to='/hot'
						className='movie-nar-items'
						label='最近热映'
					/>
					<a >北美排行榜</a>
					<ActiveLink 
						to="/top250" 
						className='movie-nar-items'
						label='top250' 
					/>
					<ActiveLink 
						to="/cinemas" 
						className='movie-nar-items'
						label='附近影院' 
					/>
					<a>去选座</a>
					|
					<a>welcome, { this.props.store.movie.user }</a>
					<a className ='button-a' onClick={ this.handleLogout }>Logout</a>
					<Link to='/' className='movie-nar-items'>首页</Link>
				</div>
			</div>
		)
	}
}