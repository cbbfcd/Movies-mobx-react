import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import Loading from './Loading';

@inject('store')
@withRouter
@observer
export default class HotMovieInfo extends Component{
	constructor(props) {
		super(props);
		this.handleClick = ::this.handleClick;
		this.checkComment =::this.checkComment;
	}

	handleClick(){
		this.props.history.replace({
    		pathname:'/hot'
    	});

    	// 清除数据
    	this.props.store.movie.clearHotMovies();
	}

	checkComment(){
		let movieDetailInfo = this.props.store.movie.hotMovieDetail;
		movieDetailInfo = movieDetailInfo ? movieDetailInfo : {};
		this.props.history.push({
    		pathname:'/comments',
    		state: {data: movieDetailInfo}
    	});
	}

	render(){
		let { MovieDetailModel } = this.props.store.movie.hotMovieDetail;
		let { isAuthenticated } =  this.props.store.movie;
		return(
			<div className='hot-movie-detial-container'>
				{
					MovieDetailModel ? <div className='container'>
						<div className='title'>
							<h3>{ MovieDetailModel.scm }</h3>
						</div>
						<div className='body'>
							<div className='body-container'>
								<div className='img-containers'>
									<img src={ MovieDetailModel.img }/>
								</div>
								<div className='info-containers'>
									<div className='movie-title'>
										<span>{ MovieDetailModel.nm }<a>{ MovieDetailModel.sc }分</a></span>
									</div>
									<div className='jq-movie'>
										<p title={ MovieDetailModel.dra.replace(/<\/?p>/g,'') }>
											剧情: { MovieDetailModel.dra.replace(/<\/?p>/g,'') }
										</p>
									</div>
									<div className='movie-bo'>
										<p>导演: { MovieDetailModel.dir }</p>
										<p>主演: { MovieDetailModel.star }</p>
										<p>类型: { MovieDetailModel.cat }</p>
										<p>放映版本: { MovieDetailModel.ver }</p>
										<p>上映时间: { MovieDetailModel.rt }</p>
									</div>
								</div>
							</div>
						</div>
						<div className="footer">
							<a onClick={ this.handleClick }>返回</a>
							<a onClick={ this.checkComment }>查看评论</a>
						</div>
					</div> : <Loading /> 
				}
				{
					isAuthenticated ? null : <Redirect from='/ahot' to='/'/>
				}
			</div>
		)
	}
}