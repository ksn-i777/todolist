import * as serviceWorker from './serviceWorker';

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './app/App';
import { AppWithReducers } from './app/AppWithReducers'
import { AppWithRedux } from './app/AppWithRedux'
import { Provider } from 'react-redux'
import { store } from './store/store'

ReactDOM.render(
    <Provider store={store}>
        <AppWithRedux />
    </Provider>
,  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

