import React, { useEffect } from 'react'

import {
  Link,
  Outlet,
  Navigate,
  NavLink,
  Route,
  Routes
} from 'react-router-dom'

import {
  useDispatch,
  useState,
  useSelector,
  useTranslation
} from 'lib/hooks'

import {
  AppRoutes
} from 'lib/constants'

import {
  RestService,
  StoreService
} from 'services'

import {
  selectors as AuthSelectors
} from 'store/auth'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPowerOff,
  faHome,
  faUsers,
  faEnvelope,
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faQuestionCircle,
  faUserCircle
} from '@fortawesome/free-solid-svg-icons'

import Home from 'components/app/home/Home'
import Account from 'components/app/account/Account'
import Social from 'components/app/social/Social'
import Messages from 'components/app/messages/Messages'
import Support from 'components/app/support/Support'

import './App.css'

const App = () => {
  // Hooks

  const {
    userId
  } = useSelector(AuthSelectors.selectLogonData)

  const user = StoreService.useUser(userId)
  const userRelations = StoreService.useUserRelations(userId)
  const userThreads = StoreService.useUserThreads(userId)

  if (!user.status.loaded || !userRelations.status.loaded || !userThreads.status.loaded) {
    return (
      <AppLoading />
    )
  }

  return (
    <Routes>
      <Route path='/' element={<AppMain />}>
        <Route path={AppRoutes.HOME} element={<Home />} />
        <Route path={AppRoutes.ACCOUNT} element={<Account />} />
        <Route path={AppRoutes.SOCIAL} element={<Social />} />
        <Route path={AppRoutes.MESSAGES} element={<Messages />} />
        <Route path={AppRoutes.SUPPORT} element={<Support />} />
        <Route path={AppRoutes.LOGOUT} element={<AppLogout />} />
      </Route>

      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  )
}

const AppMain = () => {
  return (
    <div className='alpha-auth app'>
      <AppNavbar />
      <AppMenu />
      <Outlet />
    </div>
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

const AppLogout = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const loading = t('app:logging out')
  const logonData = useSelector(AuthSelectors.selectLogonData)

  useEffect(async () => {
    RestService.api.auth.delete(dispatch, logonData)
  })

  return (
    <div className='app-loading'>
      <div className='box'>
        {loading}
      </div>
    </div>
  )
}

const AppNavbar = () => {
  const { t } = useTranslation()
  const appTitle = t('app:title')
  const logoutTooltip = t('app:actions.logout.title')

  return (
    <div className='app-navbar'>
      <div className='left'>
        <span className='title'>
          {appTitle}
        </span>
      </div>

      <div className='right'>
        <Link
          className='action'
          title={logoutTooltip}
          to={AppRoutes.LOGOUT}
        >
          <FontAwesomeIcon icon={faPowerOff} />
        </Link>
      </div>
    </div>
  )
}

const AppMenu = () => {
  const [expanded, setExpanded] = useState(true)

  const { t } = useTranslation()
  const menuHome = t('app:home.link.title')
  const menuAccount = t('app:account.link.title')
  const menuSocial = t('app:social.link.title')
  const menuMessages = t('app:messages.link.title')
  const menuSupport = t('app:support.link.title')

  const onToggleExpanded = () => {
    setExpanded(!expanded)
  }

  return (
    <div className={`app-menu ${expanded ? 'expanded' : ''}`}>
      <button
        className='app-menu-item action'
        onClick={onToggleExpanded}
      >
        <FontAwesomeIcon
          icon={expanded ? faAngleDoubleLeft : faAngleDoubleRight}
        />
      </button>

      <AppMenuLink
        to={AppRoutes.HOME}
        icon={faHome}
        text={menuHome}
      />

      <AppMenuLink
        to={AppRoutes.ACCOUNT}
        icon={faUserCircle}
        text={menuAccount}
      />

      <AppMenuLink
        to={AppRoutes.SOCIAL}
        icon={faUsers}
        text={menuSocial}
      />

      <AppMenuLink
        to={AppRoutes.MESSAGES}
        icon={faEnvelope}
        text={menuMessages}
      />

      <AppMenuLink
        to={AppRoutes.SUPPORT}
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

export const AppContent = ({
  className = '',
  children
}) => {
  return (
    <div className={`app-content ${className}`}>
      {children}
    </div>
  )
}

export const AppArea = ({
  className = '',
  title,
  children
}) => {
  return (
    <div className={`app-area ${className}`}>
      {title && (<h1>{title}</h1>)}
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
