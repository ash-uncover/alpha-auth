import React from 'react'

import { useTranslation } from 'react-i18next'

import { faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Link } from 'react-router-dom'
import { AppRoutes } from '../../../lib/constants'

import './ShellNavbar.css'
import { AVATAR_SIZES, Avatar } from '../avatar/Avatar'

// ---------------------------------------------------
// Create Component ShellNavbar
// ---------------------------------------------------

interface ShellNavbarProperties {
}
export const ShellNavbar = ({
}: ShellNavbarProperties) => {

  // Hooks //

  const { t } = useTranslation(['app'])
  const appTitle = t('title')
  const logoutTooltip = t('actions.logout.title')

  // Rendering //

  return (
    <div className='shell-navbar'>
      <div className='shell-navbar--left'>
        <span className='title'>
          {appTitle}
        </span>
      </div>

      <div className='shell-navbar--right'>
        <Avatar
          size={AVATAR_SIZES.XS}
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