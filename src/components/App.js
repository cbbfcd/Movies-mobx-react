
/**
 * @description: App component
 */

import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { inject, observer } from "mobx-react";
import DevTools from "mobx-react-devtools";

import LazyRoute from "lazy-route";
import TopBar from './TopBar';
import NotFound from './NotFound';
import Welcome from './Welcome';
import Top250 from './Top250';
import Bundle from 'UTIL/Bundle';
import MovieOne from './MovieOne';
import HotMovies from './HotMovies';
import HotMovieInfo from './HotMovieInfo';
import CommentPage from './CommentPage';
import Cinemas from './Cinemas';

// 按需加载
import top250Container from 'bundle-loader?lazy!./top250';
const Top = ( props ) => (
    <Bundle load={ top250Container }>
        {(Container) => <Container {...props}/>}
    </Bundle>
)


export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div className="index-wrapper">
                <TopBar />
                <Switch>
                    <Route exact path='/' component={ Welcome } />
                    <Route path='/top250' component={ Top }/>
                    <Route path='/amovie' component={ MovieOne }/>
                    <Route path='/hot' component={ HotMovies } />
                    <Route path='/ahot' component={ HotMovieInfo } />
                    <Route path = '/comments' component = { CommentPage } />
                    <Route path='/cinemas' component = { Cinemas } />
                    <Route component={ NotFound } />
                </Switch>
                <DevTools />
            </div>
        )    
    }
}

