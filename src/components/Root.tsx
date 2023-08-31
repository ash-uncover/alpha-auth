import React from 'react'

import {
  useDispatch,
  useEffect,
  useSelector
} from '../lib/hooks'

import {
  AuthSelectors
} from '../store/auth/auth.selectors'

import {
  AppSelectors
} from '../store/app/app.selectors'

import {
  AppSlice
} from '../store/app/app.slice'

import { App } from './app/App'
import { Auth } from './auth/Auth'

// ---------------------------------------------------
// Create Component Root
// ---------------------------------------------------

export const Root = () => {

  // Hooks //

  const dispatch = useDispatch()

  const logonData = useSelector(AuthSelectors.logonData)
  const appStarted = useSelector(AppSelectors.started)

  useEffect(() => {
    if (!appStarted) {
      dispatch(AppSlice.actions.setStarted(true))
    }
  })

  // Rendering //
  if (logonData) {
    return (
      <App />
    )
  }
  return (
    <Auth />
  )
}
