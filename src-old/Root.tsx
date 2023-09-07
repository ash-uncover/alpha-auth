import React from 'react'

import {
  useDispatch,
  useEffect,
  useSelector
} from '../src/lib/hooks'

import {
  AuthSelectors
} from '../src/store/auth/auth.selectors'

import {
  AppSelectors
} from '../src/store/app/app.selectors'

import {
  AppSlice
} from '../src/store/app/app.slice'

import { App } from '../src/components/app/App'
import { Auth } from '../src/components/auth/Auth'

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
      <App>
        {'toto'}
      </App>
    )
  }
  return (
    <Auth />
  )
}
