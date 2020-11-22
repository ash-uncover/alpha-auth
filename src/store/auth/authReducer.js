/* eslint-disable default-param-last */

import * as AuthActions from './authActions'
import { produce } from 'immer'

import {
  DataStates
} from 'lib/constants'

export const initialState = () => ({
  logonState: DataStates.NEVER,
  logonData: null,
  logonError: null
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

// MAIN REDUCER //

const reducer = (baseState = initialState(), action) => {
  switch (action.type) {
    // POST /logon

    case AuthActions.AUTH_LOGON_FETCH: {
      return reduceAuthLogonFetch(baseState, action.payload)
    }
    case AuthActions.AUTH_LOGON_SUCCESS: {
      return reduceAuthLogonSuccess(baseState, action.payload)
    }
    case AuthActions.AUTH_LOGON_FAILURE: {
      return reduceAuthLogonFailure(baseState, action.payload)
    }

    default: {
      return baseState
    }
  }
}

export default reducer
