import React from 'react'

import {
  useDispatch,
  useSelector,
  useTranslation
} from 'lib/hooks'

import {
  selectors as AuthSelectors
} from 'store/auth'

import {
  Button
} from '@uncover/react-commons'

import {
  AuthService
} from 'services'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'

const AppNavbar = () => {
  const dispatch = useDispatch()

  const { t } = useTranslation()
  const appTitle = t('app.title')
  const logoutTooltip = t('app.actions.logout.title')

  const logonData = useSelector(AuthSelectors.authLogonDataSelector)

  const onLogout = () => {
    AuthService.api.auth.delete(dispatch, logonData)
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

export default AppNavbar
