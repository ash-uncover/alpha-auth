import {
  createSlice
} from '@reduxjs/toolkit'

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

export const reduceAppStart = (state, { payload }) => {
  const initialData = LocalStorage.get(ALPHA_AUTH_LOGON_DATA, null)
  state.logonData = initialData
}

// AUTH LOGON REDUCER //

export const reduceAuthLogonFetch = (state, { payload }) => {
  state.logonState = DataStates.FETCHING
}
export const reduceAuthLogonSuccess = (state, { payload }) => {
  const { token, userId } = payload
  state.logonState = DataStates.SUCCESS
  state.logonData = { token, userId }
  state.logonError = null
}
export const reduceAuthLogonFailure = (state, { payload }) => {
  const { error } = payload
  state.logonState = DataStates.FAILURE
  state.logonData = null
  state.logonError = error
}

export const reduceAuthLogoutFetch = (state, { payload }) => {
  state.logoutState = DataStates.FETCHING
}
export const reduceAuthLogoutSuccess = (state, { payload }) => {
  state.logonState = DataStates.NEVER
  state.logonData = null
  state.logoutState = DataStates.NEVER
  state.logoutError = null
}
export const reduceAuthLogoutFailure = (state, { payload }) => {
  const { error } = payload
  state.logonState = DataStates.NEVER
  state.logonData = null
  state.logoutState = DataStates.FAILURE
  state.logoutError = error
}

// MAIN REDUCER //

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState(),

  reducers: {
    authLogonFetch: reduceAuthLogonFetch,
    authLogonSuccess: reduceAuthLogonSuccess,
    authLogonFailure: reduceAuthLogonFailure,

    authLogoutFetch: reduceAuthLogoutFetch,
    authLogoutSuccess: reduceAuthLogoutSuccess,
    authLogoutFailure: reduceAuthLogoutFailure
  },

  extraReducers: {
    'app/appStart': reduceAppStart
  }
})

authSlice.selectors = {
  authSelector: (state) => state.auth,

  authLogonStateSelector: (state) => authSlice.selectors.authSelector(state).logonState,
  authLogonDataSelector: (state) => authSlice.selectors.authSelector(state).logonData,
  authLogonErrorSelector: (state) => authSlice.selectors.authSelector(state).logonError,

  authLogonDataTokenSelector: (state) => authSlice.selectors.authLogonDataSelector(state).token,
  authLogonDataUserIdSelector: (state) => authSlice.selectors.authLogonDataSelector(state).userId
}

export const {
  actions,
  reducer,
  selectors
} = authSlice

export default authSlice
