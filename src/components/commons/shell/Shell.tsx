import React, {
  ReactNode,
  useEffect
} from 'react'

import {
  Link,
  Outlet,
  NavLink,
} from 'react-router-dom'

import {
  FontAwesomeIcon
} from '@fortawesome/react-fontawesome'

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

import {
  useDispatch,
  useState,
  useSelector,
  useTranslation
} from '../../../lib/hooks'

import {
  AppRoutes
} from '../../../lib/constants'

import {
  AuthSelectors
} from '../../../store/auth/auth.selectors'

import {
  useUser
} from '../../../store'

import {
  AuthService
} from '../../../services/rest/AuthService'

import { Home } from '../../app/home/Home'
import { Account } from '../../app/account/Account'
import { Support } from '../../app/support/Support'

import './Shell.css'
import { ShellNavbar } from './ShellNavbar'


// ---------------------------------------------------
// Create Component Shell
// ---------------------------------------------------

interface ShellProperties {
  children: ReactNode
}
export const Shell = ({
  children
}: ShellProperties) => {

  // Hooks //

  // Rendering //

  return (
    <div className='shell'>
      <ShellNavbar />
      <AppMenu />
      <Outlet />
      {children}
    </div>
  )
}


// ---------------------------------------------------
// Create Component AppMenu
// ---------------------------------------------------

const AppMenu = () => {

  // Hooks //

  const [expanded, setExpanded] = useState(true)

  const { t } = useTranslation(['app'])
  const menuHome = t('home.link.title')
  const menuAccount = t('account.link.title')
  const menuSocial = t('social.link.title')
  const menuMessages = t('messages.link.title')
  const menuSupport = t('support.link.title')

  const onToggleExpanded = () => {
    setExpanded(!expanded)
  }

  // Rendering //

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
        to={AppRoutes.BASE}
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

// ---------------------------------------------------
// Create Component AppMenuLink
// ---------------------------------------------------

const AppMenuLink = ({
  to,
  icon,
  text
}) => {

  // Hooks //

  // Rendering //

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

// ---------------------------------------------------
// Create Component AppContent
// ---------------------------------------------------

export const AppContent = ({
  className = '',
  children
}) => {

  // Rendering //

  return (
    <div className={`app-content ${className}`}>
      {children}
    </div>
  )
}

// ---------------------------------------------------
// Create Component AppArea
// ---------------------------------------------------

export const AppArea = ({
  className = '',
  title,
  children
}) => {

  // Rendering //

  return (
    <div className={`app-area ${className}`}>
      {title && (<h1>{title}</h1>)}
      {children}
    </div>
  )
}

// ---------------------------------------------------
// Create Component AppSection
// ---------------------------------------------------

export const AppSection = ({
  title,
  children
}) => {

  // Rendering //

  return (
    <section className='app-area-section'>
      <h2 className='title'>{title}</h2>
      <div className='content'>
        {children}
      </div>
    </section>
  )
}

// ---------------------------------------------------
// Create Component AppPanel
// ---------------------------------------------------

export const AppPanel = ({
  children
}) => {

  // Rendering //

  return (
    <div className='app-panel'>
      {children}
    </div>
  )
}
