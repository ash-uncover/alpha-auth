import React from 'react'

import { useSelector } from 'react-redux'
import { AuthSelectors } from '../store/auth/auth.selectors'

import { RouteHome } from './home'
import { RouteAuth } from './auth'

import { App } from '../components/app/App'

export const RouteRoot = () => {

  // Hooks //

  const {
    token,
    userId
  } = useSelector(AuthSelectors.logonData)

  console.log('render RouteRoot')

  // Rendering //

  if (!token) {
    return (
      <App>
        <RouteAuth />
      </App>
    )
  }

  return (
    <App>
      <RouteHome />
    </App>
  )
}
