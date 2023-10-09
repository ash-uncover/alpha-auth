import React from 'react'

import { useTranslation } from 'react-i18next'

import { faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Link } from 'react-router-dom'
import { AppRoutes } from '../../../lib/constants'

import './ShellNavbar.css'
import { AvatarSizes, Avatar } from '../avatar/Avatar'
import { ClassBuilder } from '../ComponentUtil'

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

  // Rendering //

  const classes = new ClassBuilder(['ap-shell-navbar', className])

  return (
    <div
      className={classes.className}
      style={style}
    >
      <div className='ap-shell-navbar--left'>
        <span className='title'>
          {appTitle}
        </span>
      </div>

      <div className='ap-shell-navbar--right'>
        <Avatar
          size={AvatarSizes.XS}
        />

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