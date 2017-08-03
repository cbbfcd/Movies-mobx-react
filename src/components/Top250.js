import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Redirect } from 'react-router-dom';
import Loading from './Loading';
import MovieTab from './MovieTab';
let page_num =1;

/**
* 豆瓣电影top250
*/
@inject('store')
@observer
export default class Top250 extends Component{
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		let { movie } = this.props.store;
		movie.getTopMovie(1);
	}

	componentDidUpdate(){
		let { movie } = this.props.store;
		// 滚动加载数据
		$('.movie-layout').scroll(function(e){
			//滚动条位置
			var top = $('.movie-layout').scrollTop();
			//可视窗口的高度
			var height = $('.movie-layout').height();
			//页面可以滚动的高度
			var sheight = $(".movie-layout")[0].scrollHeight;

			// 计算滚动到底部触发事件
			if(top+height==sheight){
				if(movie.topMoviePageSize<250){
					page_num += 1;
					movie.getTopMovie(page_num);
				}else{
					alert('当前是最后一页');
					return;
				}
			}
		})
	}

	// mobx良好实践，间接引用值尽可能晚的使用。
	// 如下，传递一个data过去，而不是传递 title={ val.title }
	render(){
		let { movie } = this.props.store;
		return(
			<div className='top250'>
				{
					movie.topMoviePageSize&&movie.isAuthenticated  ? 
					<div className='movie-layout'>
					{
						movie.topMovies.map((val, index)=>{
							return (
								<MovieTab 
									data= { val }
									isAuthenticated = { movie.isAuthenticated }
								/>
							)
						})
					}
					</div> : <Loading />
				}
				{
					movie.isAuthenticated ? null : <Redirect from='/top250' to='/'/>
				}
			</div>
		)
	}
	// componentWillUnmount() {
	// 	this.props.store.movie.clearAllData();
	// }
}