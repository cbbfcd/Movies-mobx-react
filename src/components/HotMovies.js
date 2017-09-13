import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Redirect } from 'react-router-dom';
import Loading from './Loading';
import HotMovieTab from './HotMovieTab';
let offset = 0, limit = 20;

@inject('store')
@observer
export default class HotMovies extends Component{
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		let { movie } = this.props.store;
		movie.getHotMovies(offset, limit);
	}

	componentDidMount() {
		let { movie } = this.props.store;
		$('.hot-movies-layout').scroll(function(e){
			var top = $('.hot-movies-layout').scrollTop();
			var height = $('.hot-movies-layout').height();
			var sheight = $(".hot-movies-layout")[0].scrollHeight;

			if(top+height==sheight){
				if(movie.hotMoviesLength<100){
					offset += limit;
					movie.getHotMovies(offset, limit);
				}
			}
		})
	}


	render(){
		let { movie } = this.props.store;
		return(
			<div className='hot-movies-container'>
				{
					movie.hotMoviesLength && movie.isAuthenticated  ? 
					<div className='hot-movies-layout'>
					{
						movie.hotMovies.map((val, index) =>
							<HotMovieTab 
								data = { val }
								movie = { movie }
								key={ 'movie'+index }
							/>
						)
					}
					</div> : <Loading />
				}
				{
					movie.isAuthenticated ? null : <Redirect from='/hot' to='/'/>
				}
			</div>
		)
	}
}