import './assets/style/main.scss';
import React from "react";
import { render } from "react-dom";
import 'babel-polyfill';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "mobx-react";
import { AppContainer } from "react-hot-loader";
import { useStrict } from 'mobx';
import { rehydrate, hotRehydrate } from 'rfx-core';

import App from './components/App';
import stores from './store';


useStrict(true);
const store = rehydrate();

if (__PROD__) {
  console.info('[当前环境]: 生产环境');
}

if (__DEV__) {
  console.info('[当前环境]: 开发环境');
}

const renderApp = Component => {
  render(
    <AppContainer>
        <Provider store={__PROD__ ? store : hotRehydrate() }>
            <Router>
                <App />
            </Router>
        </Provider>
    </AppContainer>,
    document.getElementById('root')
  )
};

renderApp(App);

if (module.hot) {
  module.hot.accept(() => renderApp(App));
}
