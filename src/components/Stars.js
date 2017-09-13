import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

@observer
export default class Stars extends Component{
	constructor(props) {
		super(props);
		
	}

	render(){
		let _score = this.props.score+'';
		let stars = [];
		if(_score.indexOf('.') !== -1){
			for(let i = 0, len=~~_score; i<len; i++){
				stars.push(<img key={ 'ii'+i } src={ require("ASSET/images/full.png") } />);
			}
			stars.push(<img key={ 'ii' } src={ require("ASSET/images/half.png") } />);
		}else{
			for(let i = 0, len=~~_score; i<len; i++){
				stars.push(<img key={ 'ii'+i } src={ require("ASSET/images/full.png") } />);
			}
		}
		return(
			<div className='imgs'>
				{
					stars.map((val,i)=>val)
				}
			</div>
		)
	}
}