import React from 'react'

import {
  Switch,
  Redirect,
  Route,
  NavLink
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
import {
  faPowerOff,
  faHome,
  faUsers,
  faAngleDoubleLeft,
  faAngleDoubleRight
} from '@fortawesome/free-solid-svg-icons'

import Home from 'components/app/home/Home'
import Social from 'components/app/social/Social'

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
          <div className='app-content'>
            <Switch>
              <Route path={Routes.HOME}>
                <Home />
              </Route>
              <Route path={Routes.SOCIAL}>
                <Social />
              </Route>
              <Route path='*'>
                <Redirect to={Routes.HOME} />
              </Route>
            </Switch>
          </div>
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
  const [expanded, setExpanded] = useState(true)

  const { t } = useTranslation()
  const menuHome = t('app.home.link.title')
  const menuSocial = t('app.social.link.title')

  const onToggleExpanded = () => {
    setExpanded(!expanded)
  }

  return (
    <div className={`app-menu ${expanded ? 'expanded' : ''}`}>
      <Button
        className='app-menu-item action'
        onClick={onToggleExpanded}
      >
        <FontAwesomeIcon
          icon={expanded ? faAngleDoubleLeft : faAngleDoubleRight}
        />
      </Button>
      <NavLink
        className='app-menu-item link'
        to='/home'
        activeClassName='active'
      >
        <FontAwesomeIcon
          icon={faHome}
          size='xs'
        />
        {expanded ? menuHome : null}
      </NavLink>
      <NavLink
        className='app-menu-item link'
        to='/social'
        activeClassName='active'
      >
        <FontAwesomeIcon
          icon={faUsers}
          size='xs'
        />
        {expanded ? menuSocial : null}
      </NavLink>
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
