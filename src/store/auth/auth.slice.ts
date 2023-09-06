import {
  CaseReducer,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit'

import {
  DataStates
} from '../../lib/constants'

import {
  AuthState,
} from './auth.state'

import {
  User,
  UserToken
} from 'alpha-auth-common/build/services/auth/auth.model'

// STATE //

const getInitialState = (): AuthState => ({
  logonState: DataStates.NEVER,
  logonToken: null,
  logonData: null,
  logonError: null,

  logoutState: DataStates.NEVER,
  logoutError: null
})

// REDUCERS //

// Reuse session

export const checkSessionFetch: CaseReducer<AuthState, PayloadAction<void>> = (state, action) => {
  state.logonState = DataStates.FETCHING
}
interface CheckSessionSuccessPayload {
  token: string
  user: User
}
export const checkSessionSuccess: CaseReducer<AuthState, PayloadAction<CheckSessionSuccessPayload>> = (state, action) => {
  const { user, token } = action.payload
  state.logonState = DataStates.SUCCESS
  state.logonToken = token
  state.logonData = user
  state.logonError = null
}
interface CheckSessionFailurePayload {
  error: string
}
export const checkSessionFailure: CaseReducer<AuthState, PayloadAction<CheckSessionFailurePayload>> = (state, action) => {
  const { error } = action.payload
  state.logonState = DataStates.FAILURE
  state.logonToken = null
  state.logonData = null
  state.logonError = error
}

// Logon

export const logonFetch: CaseReducer<AuthState, PayloadAction<void>> = (state, action) => {
  state.logonState = DataStates.FETCHING
}
interface LogonSuccessPayload {
  data: UserToken
}
export const logonSuccess: CaseReducer<AuthState, PayloadAction<LogonSuccessPayload>> = (state, action) => {
  const { token, user } = action.payload.data
  state.logonState = DataStates.SUCCESS
  state.logonData = user
  state.logonToken = token
  state.logonError = null
}
interface LogonFailurePayload {
  error: string
}
export const logonFailure: CaseReducer<AuthState, PayloadAction<LogonFailurePayload>> = (state, action) => {
  const { error } = action.payload
  state.logonState = DataStates.FAILURE
  state.logonToken = null
  state.logonData = null
  state.logonError = error
}

// Logout

export const logoutFetch: CaseReducer<AuthState, PayloadAction<void>> = (state) => {
  state.logoutState = DataStates.FETCHING
  state.logonToken = null
  state.logonData = null
}
export const logoutSuccess: CaseReducer<AuthState, PayloadAction<void>> = (state) => {
  state.logonState = DataStates.NEVER
  state.logoutState = DataStates.NEVER
  state.logoutError = null
}
interface LogoutFailurePayload {
  error: string
}
export const logoutFailure: CaseReducer<AuthState, PayloadAction<LogoutFailurePayload>> = (state, action) => {
  const { error } = action.payload
  state.logonState = DataStates.NEVER
  state.logoutState = DataStates.FAILURE
  state.logoutError = error
}

// Export SLICE //

export const AuthSlice = createSlice({
  name: 'auth',
  initialState: getInitialState(),

  reducers: {
    checkSessionFetch,
    checkSessionSuccess,
    checkSessionFailure,

    logonFetch,
    logonSuccess,
    logonFailure,

    logoutFetch,
    logoutSuccess,
    logoutFailure
  }
})
