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

import { ShellNavbar } from './ShellNavbar'
import { ShellMenuItem } from './ShellMenuItem'
import { ShellMenu } from './ShellMenu'

import './Shell.css'

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

  const { t } = useTranslation(['app'])
  const menuHome = t('home.link.title')
  const menuAccount = t('account.link.title')
  const menuSupport = t('support.link.title')

  // Rendering //

  return (
    <div className='ap-shell'>

      <ShellNavbar
        className='ap-shell__area'
      />

      <div
        className='ap-shell__content'
      >
        <ShellMenu className='ap-shell__area'>
          <ShellMenuItem
            to={AppRoutes.BASE}
            icon={faHome}
            text={menuHome}
          />

          <ShellMenuItem
            to={AppRoutes.ACCOUNT}
            icon={faUserCircle}
            text={menuAccount}
          />

          <ShellMenuItem
            to={AppRoutes.SUPPORT}
            icon={faQuestionCircle}
            text={menuSupport}
          />
        </ShellMenu>

        <div
          className='ap-shell__area ap-shell__main'
        >
          <Outlet />
          {children}
        </div>

      </div>
    </div>
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
