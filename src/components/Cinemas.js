import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import Loading from './Loading';
import Maps from './Maps';

@inject('store')
@withRouter
@observer
export default class Cinemas extends Component{
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		this.props.store.movie.getCinemasInfo();
	}

	render(){
		let { movie } = this.props.store;
		return(
			<div className='map-container'>
				{
					movie.cinemas.length ? <Maps data={ movie }/> : <Loading />
				}
				{
					movie.isAuthenticated ? null : <Redirect from='/cinemas' to='/'/>
				}
			</div>
		)
	}
}