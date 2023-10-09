import React, {
  ReactNode,
} from 'react'

import {
  faHome,
  faQuestionCircle,
  faUserCircle
} from '@fortawesome/free-solid-svg-icons'

import {
  useTranslation
} from '../../../lib/hooks'

import {
  AppRoutes
} from '../../../lib/constants'

import {
  ShellNavbar,
  ShellMenuItem,
  ShellMenu
} from '..'

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
          {children}
        </div>

      </div>
    </div>
  )
}