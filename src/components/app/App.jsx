import React from 'react'

import {
  Switch,
  Redirect,
  Route,
  Link
} from 'react-router-dom'

import {
  useDispatch,
  useState,
  useSelector,
  useTranslation
} from 'lib/hooks'

import {
  Routes
} from 'lib/constants'

import {
  RestService
} from 'services'

import {
  selectors as AuthSelectors
} from 'store/auth'

import {
  Button
} from '@uncover/react-commons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'

import './App.scss'

let isFirst = true

const App = () => {
  // Hooks
  const dispatch = useDispatch()

  const logonData = useSelector(AuthSelectors.authLogonDataSelector)

  if (isFirst) {
    isFirst = false
    RestService.api.users.get(dispatch, logonData.token, logonData.userId)
  }

  return (
    <Switch>
      <Route path={Routes.LOGIN}>
        <Redirect to='/' />
      </Route>
      <Route path={Routes.RECOVER}>
        <Redirect to='/' />
      </Route>
      <Route path={Routes.REGISTER}>
        <Redirect to='/' />
      </Route>
      <Route path='/'>
        <div className='alpha-auth app'>
          <AppNavbar />
          <AppMenu />
          <AppContent />
        </div>
      </Route>
    </Switch>
  )
}

const AppNavbar = () => {
  const dispatch = useDispatch()

  const { t } = useTranslation()
  const appTitle = t('app.title')
  const logoutTooltip = t('app.actions.logout.title')

  const logonData = useSelector(AuthSelectors.authLogonDataSelector)

  const onLogout = () => {
    RestService.api.auth.delete(dispatch, logonData)
  }

  return (
    <div className='app-navbar'>
      <div className='left'>
        <span className='title'>
          {appTitle}
        </span>
      </div>

      <div className='right'>
        <Button
          className='action'
          onClick={() => onLogout()}
          tooltip={logoutTooltip}
        >
          <FontAwesomeIcon icon={faPowerOff} />
        </Button>
      </div>
    </div>
  )
}

const AppMenu = () => {
  return (
    <div className='app-menu'>
      Menu
    </div>
  )
}

const AppContent = () => {
  return (
    <div className='app-content'>
      <AppPanel>
        Panel left
      </AppPanel>
      <AppArea>
        content
      </AppArea>
      <AppPanel>
        Panel right
      </AppPanel>
    </div>
  )
}

export const AppArea = ({ children }) => {
  return (
    <div className='app-area'>
      {children}
    </div>
  )
}

export const AppPanel = ({ children }) => {
  return (
    <div className='app-panel'>
      {children}
    </div>
  )
}

export default App
