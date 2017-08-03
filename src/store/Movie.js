/**
* @description: movie store
* @author: huangteng
*/
import { observable, action, runInAction, autorun, computed, reaction } from "mobx";
import axios from "axios";
import 'MOCK/mockdata';

export default class Movie{
	@observable isAuthenticated;
	@observable user;
	@observable topMovies;
	@observable hotMovies;
	@observable hotMovieDetail;
	@observable comments;
	@observable cinemas;
	_testAutoRun;
	_reaction1;
	_cinemasAutoRun;

	// 关于autorun 良好的实践是利用其返回值及时清理。
	// 也可以使用reaction，反正也只是computed和autorun的语法糖
	// 第一个参数函数的返回值，作为第二个的参数。
	constructor() {
		this.isAuthenticated = false;
		this.user = '';
		this.topMovies = [];
		this.hotMovies = [];
		this.comments = [];
		this.cinemas = [];
		this.hotMovieDetail = {
			MovieDetailModel:null,
			CommentResponseModel:null
		};
		this._testAutoRun = autorun(() => console.log('total get %d movies', this.topMoviePageSize));
		// this._reaction1 = reaction(()=>this.topMovies.length, length=>{
		// 	console.log('这样监控长度变化是错误的做法',length);
		// })
		this._cinemasAutoRun = autorun(()=>console.log('cinemas nums is %d', this.cinemas.length));
	}
	

	// 登录
	@action.bound async login(param){
		let { data } = await axios.post('/login',param)
		// async/await要用runInAction
		runInAction(() => {
			if(data.success){
				this.isAuthenticated = true;
				this.user = data.user;
			}
		})
		
		alert(data.message)
	}

	// 登出
	@action.bound logout(){
		this.isAuthenticated = false;
		this.user = '';
		this.topMovies = [];
		this._testAutoRun(); // stop the reaciton
	}

	// 获取top250
	@action.bound async getTopMovie(start){
		let { data } = await axios.get(`/api/v2/movie/top250?start=${start}&count=20`);
		runInAction(() => {
			if(data.subjects.length){
				// 去除重复的方法之一:
				//let hash = {};
				// this.topMovies =[...this.topMovies, ...data.subjects].reduce(function(item,next){
				// 	hash[next.id] ? '' : hash[next.id]=true && item.push(next);
				// 	return item;
				// },[]);

				// 去除重复方法之二：
				//this.topMovies = [...(new Set([...this.topMovies, ...data.subjects])]

				this.topMovies = [...this.topMovies, ...data.subjects];
			}
		})
	}

	// 获取最近热映电影
	@action.bound async getHotMovies(offset, limit){
		let { data } = await axios.get(`/maoyan/movie/list.json?type=hot&offset=${offset}&limit=${limit}`);
		runInAction(() => {
			if(data.data.hasNext){
				this.hotMovies = [...this.hotMovies, ...data.data.movies];
			}
		})
	}

	// 获取最近上映的电影的详情
	@action.bound async getMovieDetailsById(id){
		let { data } = await axios.get(`/maoyan/movie/${id}.json`);
		runInAction(() => {
			if(!data.status){
				this.hotMovieDetail = {...data.data};
			}
		})
	}

	// 加载评论
	@action.bound async getCommentsById(id, limit, offset){
		let { data } = await axios.get(`/maoyan/comments.json?movieid=${id}&limit=${limit}&offset=${offset}`);
		runInAction(()=>{
			let cmtss = data.data.CommentResponseModel.cmts;
			if(cmtss.length){
				this.comments = [...cmtss];
			}
		})
	}

	// 获取影院信息
	@action.bound async getCinemasInfo(){
		let { data } = await axios.get(`/maoyan/cinemas.json`);
		runInAction(()=>{
			let _cinemas = data.data;
			if(Object.keys(_cinemas).length){
				for(let key of Object.keys(_cinemas)){
					this.cinemas = [...this.cinemas, ..._cinemas[key]];
				}
				//this.cinemas = [...new Set(this.cinemas)];
			}
		})
	}

	@computed get hotMoviesLength(){
		return this.hotMovies.length;
	}

	// 计算属性 获取电影列表长度
	@computed get topMoviePageSize(){
		return this.topMovies.length;
	}

	// 清除
	@action.bound clearAllData(){
		this.topMovies=[];
		this.hotMovies = [];
		this.hotMovieDetail = {};
		this.comments = [];
	}

	// 只清除热映电影内容
	@action.bound clearHotMovies(){
		this.hotMovieDetail = {};
	}

	// 清除评论
	@action.bound clearComments(){
		this.comments = [];
	}

	// 清除电影院信息
	// @action.bound clearCinemas(){
	// 	this.cinemas = [];
	// }
}
