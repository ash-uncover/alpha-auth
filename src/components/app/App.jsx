import React, { useEffect } from 'react'

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
  selectors as UsersSelectors
} from 'store/rest/users'

import {
  Button
} from '@uncover/react-commons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPowerOff,
  faHome,
  faUsers,
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faQuestionCircle
} from '@fortawesome/free-solid-svg-icons'

import DataStates from 'lib/constants/DataStates'

import Home from 'components/app/home/Home'
import Social from 'components/app/social/Social'
import Support from 'components/app/support/Support'

import './App.scss'

const App = () => {
  // Hooks
  const dispatch = useDispatch()

  const {
    token,
    userId
  } = useSelector(AuthSelectors.authLogonDataSelector)

  const userStatus = useSelector(UsersSelectors.restUserStatusSelector(userId))
  const loaded = userStatus && userStatus !== DataStates.NEVER && userStatus !== DataStates.FETCHING_FIRST
  const canLoad = userStatus !== DataStates.FETCHING && userStatus !== DataStates.FAILURE && userStatus !== DataStates.FETCHING_FIRST

  const userRelationsStatus = useSelector(UsersSelectors.restUserRelationsStatusSelector(userId))
  const loadedRelations = userRelationsStatus && userRelationsStatus !== DataStates.NEVER && userRelationsStatus !== DataStates.FETCHING_FIRST
  const canLoadRelations = userRelationsStatus !== DataStates.FETCHING && userRelationsStatus !== DataStates.FAILURE && userRelationsStatus !== DataStates.FETCHING_FIRST

  useEffect(() => {
    if (!loaded && canLoad) {
      RestService.api.users.get(dispatch, token, userId)
    }
    if (!loadedRelations && canLoadRelations) {
      RestService.api.users.getRelations(dispatch, token, userId)
    }
  })

  if (!loaded || !loadedRelations) {
    return (
      <AppLoading />
    )
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
              <Route path={Routes.SUPPORT}>
                <Support />
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

const AppLoading = () => {
  const { t } = useTranslation()
  const loading = t('app:loading')

  return (
    <div className='app-loading'>
      <div className='box'>
        {loading}
      </div>
    </div>
  )
}

const AppNavbar = () => {
  const dispatch = useDispatch()

  const { t } = useTranslation()
  const appTitle = t('app:title')
  const logoutTooltip = t('app:actions.logout.title')

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
  const menuHome = t('app:home.link.title')
  const menuSocial = t('app:social.link.title')
  const menuSupport = t('app:support.link.title')

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

      <AppMenuLink
        to={Routes.HOME}
        icon={faHome}
        text={menuHome}
      />

      <AppMenuLink
        to={Routes.SOCIAL}
        icon={faUsers}
        text={menuSocial}
      />

      <AppMenuLink
        to={Routes.SUPPORT}
        icon={faQuestionCircle}
        text={menuSupport}
      />

    </div>
  )
}

const AppMenuLink = ({
  to,
  icon,
  text
}) => {
  return (
    <NavLink
      className='app-menu-item link'
      to={to}
      activeClassName='active'
    >
      <FontAwesomeIcon
        icon={icon}
        size='xs'
      />
      <span className='text'>
        {text}
      </span>
    </NavLink>
  )
}

export const AppArea = ({
  className = '',
  children
}) => {
  return (
    <div className={`app-area ${className}`}>
      {children}
    </div>
  )
}

export const AppSection = ({
  title,
  children
}) => {
  return (
    <section className='app-area-section'>
      <h2 className='title'>{title}</h2>
      <div className='content'>
        {children}
      </div>
    </section>
  )
}

export const AppPanel = ({
  children
}) => {
  return (
    <div className='app-panel'>
      {children}
    </div>
  )
}

export default App
