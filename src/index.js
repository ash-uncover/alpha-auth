import React from 'react'
import ReactDOM from 'react-dom'

import {
  BrowserRouter as Router
} from 'react-router-dom'

import {
  createStore
} from 'redux'

import {
  Provider
} from 'react-redux'

import reducer from 'store/reducer'

import Root from 'components/Root'

import './i18n'
import './index.css'

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(
  <Provider store={store}>
    <Router hashType='noslash'>
      <Root />
    </Router>
  </Provider>,
  document.getElementById('react-root')
)
