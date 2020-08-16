import React from 'react';
import ReactDOM from 'react-dom'
import 'antd-mobile/dist/antd-mobile.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from './redux/store'
import Register from './container/register/register'
import Login from './container/login/login'
import Main from './container/main/main'

import './assets/css/index.less'

ReactDOM.render((
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/register" component={Register}></Route>
        <Route path="/login" component={Login}></Route>
        <Route component={Main}></Route>
      </Switch>
    </Router>
  </Provider>
),
  document.getElementById('root')
)