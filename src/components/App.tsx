import React, {
  ReactNode,
  useEffect
} from 'react'

import {
  useDispatch,
} from '../lib/hooks'

import {
  AppSlice,
} from '../store/app/app.slice'

import {
  LocalStorage,
  LocalStorageItem
} from '../lib/LocalStorage'

import {
  AuthService
} from '../services/rest/AuthService'

import './App.css'

// ---------------------------------------------------
// Create Component App
// ---------------------------------------------------

interface AppProperties {
  children: ReactNode
}
export const App = ({
  children
}: AppProperties) => {

  // Hooks //

  const dispatch = useDispatch()

  useEffect(() => {
    const token = LocalStorage.get(LocalStorageItem.ALPHA_AUTH_LOGON_TOKEN)
    if (token) {
      AuthService.checkSession(dispatch, { token })
        .then(() => {
          dispatch(AppSlice.actions.setStarted(true))
        })
    } else {
      dispatch(AppSlice.actions.setStarted(true))
    }
  }, [])

  // Rendering //

  return (
    <div id='alpha-auth-app' className='app'>
      {children}
    </div>
  )
}
