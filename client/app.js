import React from 'react';
import { render } from 'react-dom';
import css from './css/common.styl';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import App from './components/ItemList';
import { Router, Route, IndexRoute, browserHistory } from "react-router";
import {baseUrl} from './components/commonComponents/common';
import Main from './components/Main.component';
import LoginComponent from './components/login/login';
import TraderMainComponent from './components/TraderDesktop/main.trader.component';
import TableComponent from './components/TraderDesktop/table.component';
import * as firebase from 'firebase';
var injectTapEventPlugin = require("react-tap-event-plugin");



  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAJTGYujHwuXt29bAikG8IPJlBEmSPcdhw",
    authDomain: "mock-project-99058.firebaseapp.com",
    databaseURL: "https://mock-project-99058.firebaseio.com",
    projectId: "mock-project-99058",
    storageBucket: "mock-project-99058.appspot.com",
    messagingSenderId: "1081845841143"
  };
  firebase.initializeApp(config);
const store = configureStore();
injectTapEventPlugin();

render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={LoginComponent}/>
                <Route path="/view/:id" component={TraderMainComponent}>
                </Route>
            </Route>
    </Router>
    </Provider>,
    document.getElementById('root')
);
