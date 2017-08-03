import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';

/**
* 电影详情 
*/
@inject('store')
@withRouter
@observer
export default class MovieOne extends Component{
	constructor(props) {
		super(props);
		this.handleClick = ::this.handleClick;
	}

	// 退出
    handleClick(){
    	this.props.history.replace({
    		pathname:'/top250'
    	})
    }

	render(){
		let { data } = this.props.location.state;
		return(
			<div className='a-movie-detail'>
					{
						this.props.store.movie.isAuthenticated ? 
						<div className='container'>
							<div className='a-movie-img'>
								<img src={ data.images.large } />
							</div>
							<div className='a-movie-tab'>
								<div className='a-movie-title'>
									<h3>{data.title} ({data.year})</h3>
									得分:  <a style={{'color':'blue'}}>{ data.rating.average }</a>分
								</div>
								<div className='a-movie-body'>
									<div>
										导演: {
											data.directors.map((val,index)=>(
												<a key={ `ht_${index}` }>{ val.name }</a>
											))
										  }
									</div>
									<div>
										主演: {
											data.casts.map((v,i)=>(
												<a key={ `_ht_${i}` }>{ v.name }</a>
											))
										}
									</div>
									<div>
										类型: {
											data.genres.map((v,i)=>(
												<a key={ `ht__${i}` }>{ v }</a>
											))
										}
									</div>
									<div>
										豆瓣: <a href={ data.alt }>点击跳转到豆瓣电影</a>
									</div>
								</div>
							</div>
							<div className='a-movie-button' onClick={ this.handleClick }>
								<a>退出</a>
							</div>
						</div> : <Redirect from="/amovie" to="/" />
					} 
			</div>
		)
	}
}