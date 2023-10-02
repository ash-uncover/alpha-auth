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
import {
  AccountsSlice
} from '../../store/rest/accounts/accounts.slice'

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
  LocalStorage.remove(LocalStorageItem.ALPHA_AUTH_LOGON_TOKEN)
  dispatch(AuthSlice.actions.logoutFetch())
  return Auth.api.auth.delete()
    .then(() => {
      dispatch(AuthSlice.actions.logoutSuccess())
    })
    .catch((error: Error) => {
      dispatch(AuthSlice.actions.logoutFailure({ error: error.message }))
    })
    .finally(() => {
      AuthConfig._csrfToken = null
    })
}

export const register = async (dispatch: Dispatch<AnyAction>, { username, password }) => {
  dispatch(AccountsSlice.actions.postRegisterFetch({ username }))
  return Auth.api.auth.register.post({ username, password })
    .then((data: UserToken) => {
      dispatch(AccountsSlice.actions.postRegisterSuccess({ data }))
    })
    .catch((error: Error) => {
      dispatch(AccountsSlice.actions.postRegisterFailure({ error: error.message }))
    })
}

export const registerValidate = async (dispatch: Dispatch<AnyAction>, { username, password }) => {
}

export const recover = async (dispatch: Dispatch<AnyAction>, { username, password }) => {
}

export const recoverValidate = async (dispatch: Dispatch<AnyAction>, { username, password }) => {
}

export const recoverUpdate = async (dispatch: Dispatch<AnyAction>, { username, password }) => {
}

export const changemail = async (dispatch: Dispatch<AnyAction>, { username, password }) => {
}

export const changemailValidate = async (dispatch: Dispatch<AnyAction>, { username, password }) => {
}

export const AuthService = {
  checkSession,

  logon,
  logout,

  register,
  registerValidate,

  recover,
  recoverValidate,
  recoverUpdate,

  changemail,
  changemailValidate,
}
