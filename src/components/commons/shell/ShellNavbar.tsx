import React from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Link } from 'react-router-dom'
import { AppRoutes } from '../../../lib/constants'

import { CONFIG } from '../../../config'

import { User } from 'alpha-auth-common/build/services/auth/auth.model'
import { AuthSelectors } from '../../../store/auth/auth.selectors'

import { ClassBuilder } from '../ComponentUtil'

import {
  AvatarSizes,
  Avatar,
  Title,
  TitleLevels
} from '..'

import './ShellNavbar.css'

// ---------------------------------------------------
// Create Component ShellNavbar
// ---------------------------------------------------

interface ShellNavbarProperties {
  className?: string
  style?: React.CSSProperties
}
export const ShellNavbar = ({
  className,
  style,
}: ShellNavbarProperties) => {

  // Hooks //

  const { t } = useTranslation(['app'])
  const appTitle = t('title')
  const logoutTooltip = t('actions.logout.title')

  const user: User = useSelector(AuthSelectors.logonData)

  // Rendering //

  const classes = new ClassBuilder(['ap-shell-navbar', className])

  return (
    <div
      className={classes.className}
      style={style}
    >
      <div className='ap-shell-navbar--left'>
        <Title
          className='ap-shell-navbar__title'
          level={TitleLevels.H3}
        >
          {appTitle}
        </Title>
      </div>

      <div className='ap-shell-navbar--right'>
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
      </div>
    </div>
  )
}