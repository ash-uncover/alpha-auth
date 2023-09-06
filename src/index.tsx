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
import { App } from './components/App'

// Plugin management
import {
  WardProvider,
  WardDevTools
} from '@uncover/ward-react'

// Import main css
import './index.css'

let Router = BrowserRouter
if (CONFIG.ALPHA_AUTH_ENVIRONMENT === 'github') {
  Router = HashRouter
}

const containerRoot = document.getElementById('react-root')!
const root = createRoot(containerRoot)

root.render(
  <Provider store={store}>
    <WardProvider plugin={CONFIG.ALPHA_AUTH_PLUGIN}>
      <App>
        <Router>
          <RouteRoot />
        </Router>
      </App>
      {CONFIG.ALPHA_AUTH_ENVIRONMENT === 'local' ? <WardDevTools /> : null}
    </WardProvider>
  </Provider>
)
