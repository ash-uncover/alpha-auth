import React from 'react'

import {
  useSelector
} from 'lib/hooks'

import {
  selectors as AuthSelectors
} from 'store/auth'

import App from 'components/app/App'
import Auth from 'components/auth/Auth'

const Root = () => {
  // Hooks
  const logonData = useSelector(AuthSelectors.authLogonDataSelector)

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
