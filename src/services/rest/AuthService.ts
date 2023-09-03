import { Dispatch } from 'react'
import { AnyAction } from '@reduxjs/toolkit'

import {
  AuthSlice
} from '../../store/auth/auth.slice'

import {
  Auth
} from './RestService'

import {
  User,
  UserToken
} from 'alpha-auth-common/build/services/auth/auth.model'

export const checkSession = async (dispatch: Dispatch<AnyAction>, { token }) => {
  dispatch(AuthSlice.actions.checkSessionFetch({ token }))
  return Auth.api.auth.get()
    .then((user: User) => {
      const result = { user }
      dispatch(AuthSlice.actions.checkSessionSuccess(result))
    })
    .catch((error: Error) => {
      dispatch(AuthSlice.actions.checkSessionFailure({ error: error.message }))
    })
}

export const logon = async (dispatch: Dispatch<AnyAction>, { username, password }) => {
  dispatch(AuthSlice.actions.logonFetch())
  return Auth.api.auth.post({ username, password })
    .then((data: UserToken) => {
      dispatch(AuthSlice.actions.logonSuccess({ data }))
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
