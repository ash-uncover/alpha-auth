import React from 'react'
import ReactDOM from 'react-dom'

import {
  BrowserRouter as Router
} from 'react-router-dom'

import {
  Provider
} from 'react-redux'

import store from 'store'

import Root from 'components/Root'

import './index.css'

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Root />
    </Router>
  </Provider>,
  document.getElementById('react-root')
)
