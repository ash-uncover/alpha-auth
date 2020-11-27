import React from 'react'

import {
  useDispatch,
  useEffect,
  useSelector
} from 'lib/hooks'

import {
  selectors as AuthSelectors
} from 'store/auth'

import {
  actions as AppActions,
  selectors as AppSelectors
} from 'store/app'

import App from 'components/app/App'
import Auth from 'components/auth/Auth'

const Root = () => {
  // Hooks
  const dispatch = useDispatch()

  const logonData = useSelector(AuthSelectors.authLogonDataSelector)
  const appStarted = useSelector(AppSelectors.appStartSelector)

  useEffect(() => {
    if (!appStarted) {
      dispatch(AppActions.appStart())
    }
  })

  if (logonData) {
    return (
      <App />
    )
  }
  return (
    <Auth />
  )
}

export default Root
