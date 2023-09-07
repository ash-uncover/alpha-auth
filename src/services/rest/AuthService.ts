import { Dispatch } from 'react'
import { AnyAction } from '@reduxjs/toolkit'

import {
  AuthSlice
} from '../../store/auth/auth.slice'

import {
  Auth, AuthConfig
} from './RestService'

import {
  User,
  UserToken
} from 'alpha-auth-common/build/services/auth/auth.model'

import {
  LocalStorage,
  LocalStorageItem
} from '../../lib/LocalStorage'

export const checkSession = async (dispatch: Dispatch<AnyAction>, { token }) => {
  AuthConfig._csrfToken = token
  dispatch(AuthSlice.actions.checkSessionFetch())
  try {
    const user: User = await Auth.api.auth.get()
    LocalStorage.set(LocalStorageItem.ALPHA_AUTH_LOGON_TOKEN, token)
    dispatch(AuthSlice.actions.checkSessionSuccess({ user, token }))

  } catch (error) {
    AuthConfig._csrfToken = null
    LocalStorage.remove(LocalStorageItem.ALPHA_AUTH_LOGON_TOKEN)
    dispatch(AuthSlice.actions.checkSessionFailure({ error: error.message }))
  }
}

export const logon = async (dispatch: Dispatch<AnyAction>, { username, password }) => {
  dispatch(AuthSlice.actions.logonFetch())
  return Auth.api.auth.post({ username, password })
    .then((data: UserToken) => {
      AuthConfig._csrfToken = data.token
      LocalStorage.set(LocalStorageItem.ALPHA_AUTH_LOGON_TOKEN, data.token)
      dispatch(AuthSlice.actions.logonSuccess({ data }))
    })
    .catch((error: Error) => {
      AuthConfig._csrfToken = null
      LocalStorage.remove(LocalStorageItem.ALPHA_AUTH_LOGON_TOKEN)
      dispatch(AuthSlice.actions.logonFailure({ error: error.message }))
    })
}

export const logout = async (dispatch: Dispatch<AnyAction>) => {
  AuthConfig._csrfToken = null
  LocalStorage.remove(LocalStorageItem.ALPHA_AUTH_LOGON_TOKEN)
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
  checkSession,
  logon,
  logout,
}
