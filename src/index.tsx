import React from 'react'
import { createRoot } from 'react-dom/client'

import {
  Provider
} from 'react-redux'

import {
  BrowserRouter,
  HashRouter
} from 'react-router-dom'

// Import translation module
import 'lib/utils/i18n'

// Import icons
import 'lib/utils/icons'

// Should be imported before first access to the reducers
import store from './store'

// Import components
import { RouteRoot } from './routes'
import { CONFIG } from './config'

let Router = BrowserRouter
if (CONFIG.ALPHA_AUTH_ENVIRONMENT === 'github') {
  Router = HashRouter
}

const containerRoot = document.getElementById('reactroot')!
const root = createRoot(containerRoot)

root.render(
  <Provider store={store}>
    <Router>
      <RouteRoot />
    </Router>
  </Provider>
)
