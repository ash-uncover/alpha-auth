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

export const appStart = (state, { payload }) => {
  const storedData = LocalStorage.get(ALPHA_AUTH_LOGON_DATA, null)
  const initialData = initialState()
  if (storedData && storedData.token && storedData.userId) {
    initialData.logonData = storedData
  }
  state.logonState = initialData.logonState
  state.logonData = initialData.logonData
  state.logonError = initialData.logonError
  state.logoutState = initialData.logoutState
  state.logoutError = initialData.logoutError
}

// AUTH LOGON REDUCER //

export const authLogonFetch = (state, { payload }) => {
  state.logonState = DataStates.FETCHING
}
export const authLogonSuccess = (state, { payload }) => {
  const { token, userId } = payload
  state.logonState = DataStates.SUCCESS
  state.logonData = { token, userId }
  state.logonError = null
}
export const authLogonFailure = (state, { payload }) => {
  const { error } = payload
  state.logonState = DataStates.FAILURE
  state.logonData = null
  state.logonError = error
}

export const authLogoutFetch = (state, { payload }) => {
  state.logoutState = DataStates.FETCHING
}
export const authLogoutSuccess = (state, { payload }) => {
  LocalStorage.remove(ALPHA_AUTH_LOGON_DATA)
  state.logonState = DataStates.NEVER
  state.logonData = null
  state.logoutState = DataStates.NEVER
  state.logoutError = null
}
export const authLogoutFailure = (state, { payload }) => {
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
    authLogonFetch,
    authLogonSuccess,
    authLogonFailure,

    authLogoutFetch,
    authLogoutSuccess,
    authLogoutFailure
  },

  extraReducers: {
    'app/appStart': appStart
  }
})

export const selectAuth = (state) => state.auth
export const selectLogonState = (state) => selectAuth(state).logonState
export const selectLogonData = (state) => selectAuth(state).logonData
export const selectLogonError = (state) => selectAuth(state).logonError
export const selectToken = (state) => selectLogonData(state).token
export const selectUserId = (state) => selectLogonData(state).userId
export const selectLogoutState = (state) => selectAuth(state).logoutState
export const selectLogoutError = (state) => selectAuth(state).logoutData

authSlice.selectors = {
  selectAuth,
  selectLogonState,
  selectLogonData,
  selectLogonError,
  selectToken,
  selectUserId,
  selectLogoutState,
  selectLogoutError
}

export const {
  actions,
  reducer,
  selectors
} = authSlice

export default authSlice
