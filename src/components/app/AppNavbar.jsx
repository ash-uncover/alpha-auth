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

const AppNavbar = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const logonData = useSelector(AuthSelectors.authLogonDataSelector)

  const onLogout = () => {
    AuthService.api.auth.delete(dispatch, logonData)
  }

  return (
    <div className='app-navbar'>
      <Button
        onClick={() => onLogout()}
      >
        {t('app.actions.logout.title')}
      </Button>
    </div>
  )
}

export default AppNavbar
