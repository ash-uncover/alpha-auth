import React from 'react'

import { useSelector } from 'react-redux'
import { AuthSelectors } from '../store/auth/auth.selectors'

import { RouteHome } from './home'
import { RouteAuth } from './auth'

import { Auth } from '../components/auth/Auth'
import { AppLoader } from '../components/app/AppLoader'

// ---------------------------------------------------
// Create Component RouteRoot
// ---------------------------------------------------

export const RouteRoot = () => {

  // Hooks //

  const token = useSelector(AuthSelectors.logonToken)
  const logonState = useSelector(AuthSelectors.logonState)

  // Rendering //

  if (!token) {
    return (<RouteAuth />)
  }

  if (token && !logonState.loaded) {
    return (
      <Auth>
        <AppLoader />
      </Auth>
    )
  }

  return (<RouteHome />)
}
