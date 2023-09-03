import { Dispatch } from 'react'
import {
  AuthSlice
} from '../../store/auth/auth.slice'

import {
  Auth, AuthConfig
} from './RestService'
import { AnyAction } from '@reduxjs/toolkit'

export const logon = async (dispatch: Dispatch<AnyAction>, { username, password }) => {
  const token = `Basic ${window.btoa(unescape(encodeURIComponent(`${username}:${password}`)))}`
  AuthConfig._csrfToken = token
  dispatch(AuthSlice.actions.logonFetch({ token }))
  return Auth.api.auth.get()
    .then(({ userId }) => {
      const result = { userId }
      dispatch(AuthSlice.actions.logonSuccess(result))
    })
    .catch((error: Error) => {
      dispatch(AuthSlice.actions.logonFailure({ error: error.message }))
    })
}

export const logout = async (dispatch: Dispatch<AnyAction>) => {
  dispatch(AuthSlice.actions.logoutFetch())
  return Auth.api.auth.delete()
    .then(() => {
      dispatch(AuthSlice.actions.logoutSuccess())
    })
    .catch((error: Error) => {
      dispatch(AuthSlice.actions.logoutFailure({ error: error.message }))
    })
}

export const AuthService = {
  logon,
  logout,
}
