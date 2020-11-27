/* eslint-disable default-param-last */

import { produce } from 'immer'

import * as AuthActions from './authActions'

import LocalStorage, {
  ALPHA_AUTH_LOGON_DATA
} from 'lib/LocalStorage'

import {
  DataStates
} from 'lib/constants'

export const initialState = () => ({
  logonState: DataStates.NEVER,
  logonData: null,
  logonError: null,
  logoutState: DataStates.NEVER,
  logoutError: null
})

// INITIALIZATION //

export const reduceInit = (baseState, payload) => {
  const initialData = LocalStorage.get(ALPHA_AUTH_LOGON_DATA, null)
  const newState = produce(baseState, (state) => {
    state.logonData = initialData
  })
  return newState
}

// AUTH LOGON REDUCER //

export const reduceAuthLogonFetch = (baseState, payload) => {
  const newState = produce(baseState, (state) => {
    state.logonState = DataStates.FETCHING
  })
  return newState
}
export const reduceAuthLogonSuccess = (baseState, payload) => {
  const { token, userId } = payload
  const newState = produce(baseState, (state) => {
    state.logonState = DataStates.SUCCESS
    state.logonData = { token, userId }
    state.logonError = null
  })
  return newState
}
export const reduceAuthLogonFailure = (baseState, payload) => {
  const { error } = payload
  const newState = produce(baseState, (state) => {
    state.logonState = DataStates.FAILURE
    state.logonData = null
    state.logonError = error
  })
  return newState
}

export const reduceAuthLogoutFetch = (baseState, payload) => {
  const newState = produce(baseState, (state) => {
    state.logoutState = DataStates.FETCHING
  })
  return newState
}
export const reduceAuthLogoutSuccess = (baseState, payload) => {
  const newState = produce(baseState, (state) => {
    state.logonState = DataStates.NEVER
    state.logonData = null
    state.logoutState = DataStates.NEVER
    state.logoutError = null
  })
  return newState
}
export const reduceAuthLogoutFailure = (baseState, payload) => {
  const { error } = payload
  const newState = produce(baseState, (state) => {
    state.logonState = DataStates.NEVER
    state.logonData = null
    state.logoutState = DataStates.FAILURE
    state.logoutError = error
  })
  return newState
}

// MAIN REDUCER //

const reducer = (baseState = initialState(), action) => {
  switch (action.type) {
    case '@@INIT': {
      return reduceInit(baseState, action.payload)
    }
    // Logon

    case AuthActions.AUTH_LOGON_FETCH: {
      return reduceAuthLogonFetch(baseState, action.payload)
    }
    case AuthActions.AUTH_LOGON_SUCCESS: {
      return reduceAuthLogonSuccess(baseState, action.payload)
    }
    case AuthActions.AUTH_LOGON_FAILURE: {
      return reduceAuthLogonFailure(baseState, action.payload)
    }

    // Logout

    case AuthActions.AUTH_LOGOUT_FETCH: {
      return reduceAuthLogoutFetch(baseState, action.payload)
    }
    case AuthActions.AUTH_LOGOUT_SUCCESS: {
      return reduceAuthLogoutSuccess(baseState, action.payload)
    }
    case AuthActions.AUTH_LOGOUT_FAILURE: {
      return reduceAuthLogoutFailure(baseState, action.payload)
    }

    default: {
      return baseState
    }
  }
}

export default reducer
