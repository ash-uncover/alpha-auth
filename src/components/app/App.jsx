import React from 'react'

import {
  useDispatch,
  useState,
  useSelector,
  useTranslation
} from 'lib/hooks'

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

const App = () => {
  // Hooks
  const dispatch = useDispatch()

  const logonData = useSelector(AuthSelectors.authLogonDataSelector)

  RestService.api.users.get(dispatch, logonData.token, logonData.userId)

  return (
    <div className='alpha-auth app'>
      <AppNavbar />
      <div className='app-area'>
        <AppMenu />
        <AppSubMenu />
        <AppContent />
        <AppPanel />
      </div>
    </div>
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

const AppSubMenu = () => {
  return (
    <div className='app-sub-menu'>
      SubMenu
    </div>
  )
}

const AppContent = () => {
  return (
    <div className='app-content'>
      content
    </div>
  )
}

const AppPanel = () => {
  return (
    <div className='app-panel'>
      Panel
    </div>
  )
}

export default App
