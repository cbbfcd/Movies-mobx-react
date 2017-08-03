import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router';

/**
* 电影tab页面
*/
@withRouter
@observer
export default class MovieTab extends Component{
	constructor(props) {
		super(props);
		this.handleOnClick = ::this.handleOnClick;
	}

	// 点击跳转到电影详情页面
	handleOnClick(){
		this.props.history.push({
			pathname:'/amovie',
			state:{data:this.props.data,isAuthenticated:this.props.isAuthenticated}
		})
	}

	render(){
		return(
			<div className='movie-tab' onClick={ this.handleOnClick }>
				<div>
					<h4>{ this.props.data.title }{' '}<a style={{color:'steelblue'}}>{ this.props.data.rating.average }分</a></h4>
				</div>
				<div>
					<img className='img-top' src={ this.props.data.images.large }/>
				</div>
			</div>
		)
	}
}