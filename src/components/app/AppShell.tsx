import React, { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import {
  faHome,
  faQuestionCircle,
  faUserCircle
} from '@fortawesome/free-solid-svg-icons'

import { CONFIG } from '../../config'
import { AppRoutes } from '../../lib/constants'
import { AuthSelectors } from '../../store/auth/auth.selectors'

import { User } from 'alpha-auth-common/build/services/auth/auth.model'

import {
  Avatar,
  AvatarSizes,
  Shell,
  ShellMenu,
  ShellMenuItem,
  ShellNavbar
} from '@uncover/react-commons'

// ---------------------------------------------------
// Create Component
// ---------------------------------------------------

interface AppShellProperties {
  children: ReactNode
}
export const AppShell = ({
  children
}: AppShellProperties) => {

   // Hooks //

   const location = useLocation()
   const { t } = useTranslation(['app'])
   const menuHome = t('home.link.title')
   const menuAccount = t('account.link.title')
   const menuSupport = t('support.link.title')
   const appTitle = t('title')
   const logoutTooltip = t('actions.logout.title')

   const user: User = useSelector(AuthSelectors.logonData)

   // Rendering //

  return (
    <Shell>

      <ShellNavbar
        className='ap-shell__area'
        appTitle={appTitle}
      >
         {user ? (
          <Link
            title={logoutTooltip}
            to={AppRoutes.LOGOUT}
          >
            <Avatar
              className='ap-shell-navbar__avatar'
              image={`${CONFIG.ALPHA_AUTH_REST_URL}/${user.avatar}`}
              size={AvatarSizes.S}
            />
          </Link>
        ) : null}
      </ShellNavbar>

      <div
        className='ap-shell__content'
      >
        <ShellMenu className='ap-shell__area'>
          <ShellMenuItem
            to={AppRoutes.HOME}
            icon={faHome}
            selected={location.pathname.indexOf(AppRoutes.HOME) !== -1}
            text={menuHome}
          />

          <ShellMenuItem
            to={AppRoutes.ACCOUNT}
            icon={faUserCircle}
            selected={location.pathname.indexOf(AppRoutes.ACCOUNT) !== -1}
            text={menuAccount}
          />

          <ShellMenuItem
            to={AppRoutes.SUPPORT}
            icon={faQuestionCircle}
            selected={location.pathname.indexOf(AppRoutes.SUPPORT) !== -1}
            text={menuSupport}
          />
        </ShellMenu>

        <div
          className='ap-shell__area ap-shell__main'
        >
          {children}
        </div>

      </div>
    </Shell>
  )
}
