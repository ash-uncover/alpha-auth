/* eslint-disable default-param-last */

import * as AuthActions from './authActions'
import { produce } from 'immer'

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

// AUTH LOGON REDUCER //

export const reduceAuthLogonFetch = (baseState, payload) => {
  const newState = produce(baseState, (state) => {
    state.logonState = DataStates.FETCHING
  })
  return newState
}
export const reduceAuthLogonSuccess = (baseState, payload) => {
  const { token } = payload
  const newState = produce(baseState, (state) => {
    state.logonState = DataStates.SUCCESS
    state.logonData = { token }
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
