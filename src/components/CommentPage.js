import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import Loading from './Loading';
import Stars from './Stars';
let offset= 0, limit = 5;

@inject('store')
@withRouter
@observer
export default class CommentPage extends Component{
	constructor(props) {
		super(props);
		this.play = ::this.play;
		this.mute = ::this.mute;
		this.handleOut =::this.handleOut;
		this.pageUp =::this.pageUp;
		this.pageDown =::this.pageDown;
	}

	componentWillMount() {
		let { data } = this.props.location.state;
		let { MovieDetailModel } = data ? data : {};
		let { id, vd } = MovieDetailModel;
		// 获取评论
		this.props.store.movie.getCommentsById(id, limit, offset);
	}

	// 退出
	handleOut(){
		this.props.history.replace({
			pathname:'/ahot'
		})

		this.props.store.movie.clearComments();
	}
	// 上一页
	pageUp(){
		let { data } = this.props.location.state;
		let { MovieDetailModel } = data ? data : {};
		let { id, vd } = MovieDetailModel;
		offset -= limit;
		if(offset<0){
			alert('当前已经是第一页');
			return;
		}
		this.props.store.movie.getCommentsById(id, limit, offset);
	}

	// 下一页	
	pageDown(){
		let { data } = this.props.location.state;
		let { MovieDetailModel } = data ? data : {};
		let { id, vd } = MovieDetailModel;
		offset += limit;
		this.props.store.movie.getCommentsById(id, 5, offset);
	}

	// 播放/暂停
	play(){
		let player = document.getElementById('player');
		if(player.paused){
			player.play();
		}else{
			player.pause();
		}
	}

	// 静音
	mute(){
		let player = document.getElementById('player');
		player.muted = player.muted ? false : true; 
	}

	render(){
		let { data } = this.props.location.state;
		let { MovieDetailModel } = data ? data : {};
		let { id, vd } = MovieDetailModel;
		let { isAuthenticated, comments } = this.props.store.movie;
		return(
			<div className='comments-container'>
				<div className='v-zone'>
					<span>预告:</span>
					<div className='video-container'>
						<video id='player' controls>
							<source src={ vd } type="video/mp4" />
							当前浏览器太low,不支持视频播放！
						</video>
					</div>
					<div className='contorl-btns'>
						<button onClick={ this.play }>播放/暂停</button>
						<button onClick={ this.mute }>静音</button>
					</div>
				</div>
				<div className='c-zone'>
					<div className='c-body'>
						{
							comments.map((val,index)=>(
								<div className='comment-item' key={ 'cc'+index }>
									<div className='title'>
										<span><a>用户:</a> { val.nickName }</span>
										<div>评分: 
											<Stars 
												score = { val.score }
												style={{ 'margin-left':'5px' }}
											/>
										</div>
									</div>
									<div className='content'>
										<span><a>评价:</a> { val.content }</span>
									</div>
								</div>
							))
						}
					</div>
					<div className='page-btn'>
						<button onClick={ this.pageUp }>上一页</button>
						<button onClick={ this.pageDown }>下一页</button>
						<button onClick={ this.handleOut }>退出</button>
					</div>
				</div>
				{
					isAuthenticated ? null : <Redirect from='/comments' to='/'/>
				}
			</div>
		)
	}
}