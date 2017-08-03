import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router';

@inject('movie')
@withRouter
@observer
export default class HotMovieTab extends Component{
	constructor(props) {
		super(props);
		this.handleOnClick = ::this.handleOnClick;
	}

	handleOnClick(){
		this.props.movie.getMovieDetailsById(this.props.data.id);
		if(this.props.movie.hotMovieDetail !== null){
			this.props.history.push({
				pathname:'/ahot',
			});
		}
	}


	render(){
		return(
			<div className='hot-movie-tab' onClick={ this.handleOnClick }>
				<div>
					<h4>{ this.props.data.nm }{"  "}<a style={{color:'steelblue'}}>{ this.props.data.sc }分</a></h4>
					<h6>{ this.props.data.scm }</h6>
				</div>
				<div>
					
				</div>
				<div className= 'img-container'>
					<img className='img-top' src={ this.props.data.img }/>
				</div>
			</div>
		)
	}
}