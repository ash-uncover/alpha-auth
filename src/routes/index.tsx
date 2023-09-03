import React from 'react'

import { useSelector } from 'react-redux'
import { AuthSelectors } from '../store/auth/auth.selectors'

import { RouteHome } from './home'
import { RouteAuth } from './auth'

import { App } from '../components/app/App'
import { Auth } from '../components/auth/Auth'
import { AppLoader } from '../components/app/AppLoader'

// ---------------------------------------------------
// Create Component RouteRoot
// ---------------------------------------------------

export const RouteRoot = () => {

  // Hooks //

  const { token } = useSelector(AuthSelectors.logonData)
  const logonState = useSelector(AuthSelectors.logonState)

  // Rendering //

  if (!token) {
    return (
      <Auth>
        <RouteAuth />
      </Auth>
    )
  }

  if (token && !logonState.loaded) {
    return (
      <App>
        <AppLoader />
      </App>
    )
  }

  return (
    <App>
      <RouteHome />
    </App>
  )
}
