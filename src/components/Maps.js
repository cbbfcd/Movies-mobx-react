import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import Loading from './Loading';

@withRouter
@observer
export default class Maps extends Component{
	constructor(props) {
		super(props);
	}

	// 设置point
	addMarker(point){
		var marker = new BMap.Marker(point);
		map.addOverlay(marker);
		marker.setAnimation(BMAP_ANIMATION_BOUNCE);
	}

	// 利用HTML5获取当前所在地经纬度
	getPositionByHtml5(){
		if(navigator.geolocation){
			navigator.geolocation.getCurrentPosition(this.showPosition, this.showError);
		}else{
			alert('当前浏览器太low，获取不到你的位置！')
		}
	}

	showPosition(position){
		let latitude = position.coords.latitude || 30.67994285;
		let longitude = position.coords.longitude || 104.06792346;
		
		// 绘制地图
		let map = new BMap.Map("allmap");
		// html5这个定位不准，给我定位到兰州去了。
		//map.centerAndZoom(new BMap.Point(longitude, latitude), 14);
		map.addControl(new BMap.MapTypeControl());
		map.centerAndZoom('成都',14);
		map.enableScrollWheelZoom(true);
	}

	showError(error){
		switch(error.code){
			case error.PERMISSION_DENIED:
				alert('你的浏览器拒绝了地理请求');
				break;
			case error.POSITION_UNAVAILABLE:
				alert('没有获取到你的位置');
				break;
			case error.TIMEOUT:
				alert('请求超时');
				break;
			case error.UNKNOWN_ERROR:
				alert('未知错误');
				break;
		}
	}

	componentDidMount() {
		//获取你的位置
		//this.getPositionByHtml5();
		let map = new BMap.Map("allmap");
		map.addControl(new BMap.MapTypeControl());
		map.centerAndZoom('成都',14);
		map.enableScrollWheelZoom(true);

		let { cinemas } = this.props.data;

		// 信息窗口展示
		var opts = {
			width: 250,
			height: 120,
			title: '影院信息',
			enableMessage: true
		}
		// 绘制地图
		if(cinemas.length){
			cinemas.map((val, index)=>{
				var point = new BMap.Point(val.lng, val.lat);
				var marker = new BMap.Marker(point);
				// 展示信息
				var cname = val.nm;
				var caddr = val.addr;
				var content = `${cname}<br/>${caddr}`;

				map.addOverlay(marker);
				marker.setAnimation(BMAP_ANIMATION_BOUNCE);
				marker.addEventListener("click",function(e){
					var p = e.target;
					var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
					var infoWindow = new BMap.InfoWindow(content,opts);  // 创建信息窗口对象 
					map.openInfoWindow(infoWindow,point); //开启信息窗口
				});
			})
		}
	}

	render(){
		return(
			<div id='allmap'>

			</div>
		)
	}
}