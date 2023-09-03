import {
  CaseReducer,
  createAction,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit'

import {
  LocalStorageItem,
  LocalStorage,
} from '../../lib/LocalStorage'

import {
  DataStates
} from '../../lib/constants'

import {
  AuthState,
} from './auth.state'
import { User, UserToken } from 'alpha-auth-common/build/services/auth/auth.model'
import { AuthConfig } from '../../services/rest/RestService'

// STATE //

const getInitialState = (): AuthState => ({
  logonState: DataStates.NEVER,
  logonToken: null,
  logonData: null,
  logonError: null,

  logoutState: DataStates.NEVER,
  logoutError: null
})

const initialState = getInitialState()

// REDUCERS //

const appSetStartedAction = createAction('app/setStarted')
const appSetStarted = (state: AuthState, action) => {
  const initialData = getInitialState()
  state.logonState = initialData.logonState
  state.logonToken = initialData.logonToken
  state.logonData = initialData.logonData
  state.logonError = initialData.logonError
  state.logoutState = initialData.logoutState
  state.logoutError = initialData.logoutError

  const storedToken = LocalStorage.get(LocalStorageItem.ALPHA_AUTH_LOGON_TOKEN, null)
  if (storedToken) {
    state.logonToken = storedToken
  }
}

// Reuse session

interface CheckSessionPayload {
  token: string
}
export const checkSessionFetch: CaseReducer<AuthState, PayloadAction<CheckSessionPayload>> = (state, action) => {
  const { token } = action.payload
  AuthConfig._csrfToken = state.logonToken
  state.logonState = DataStates.FETCHING
  state.logonToken = token
}
interface CheckSessionSuccessPayload {
  user: User
}
export const checkSessionSuccess: CaseReducer<AuthState, PayloadAction<CheckSessionSuccessPayload>> = (state, action) => {
  const { user } = action.payload
  state.logonState = DataStates.SUCCESS
  state.logonData = user
  state.logonError = null
}
interface CheckSessionFailurePayload {
  error: string
}
export const checkSessionFailure: CaseReducer<AuthState, PayloadAction<CheckSessionFailurePayload>> = (state, action) => {
  const { error } = action.payload
  AuthConfig._csrfToken = null
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
  AuthConfig._csrfToken = token
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
  AuthConfig._csrfToken = null
  state.logonState = DataStates.FAILURE
  state.logonToken = null
  state.logonData = null
  state.logonError = error
}

// Logout

export const logoutFetch: CaseReducer<AuthState, PayloadAction<void>> = (state) => {
  state.logoutState = DataStates.FETCHING
}
export const logoutSuccess: CaseReducer<AuthState, PayloadAction<void>> = (state) => {
  LocalStorage.remove(LocalStorageItem.ALPHA_AUTH_LOGON_TOKEN)
  AuthConfig._csrfToken = null
  state.logonState = DataStates.NEVER
  state.logonToken = null
  state.logonData = null
  state.logoutState = DataStates.NEVER
  state.logoutError = null
}
interface LogoutFailurePayload {
  error: string
}
export const logoutFailure: CaseReducer<AuthState, PayloadAction<LogoutFailurePayload>> = (state, action) => {
  LocalStorage.remove(LocalStorageItem.ALPHA_AUTH_LOGON_TOKEN)
  AuthConfig._csrfToken = null
  const { error } = action.payload
  state.logonState = DataStates.NEVER
  state.logonToken = null
  state.logonData = null
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
  },

  extraReducers: (builder) => {
    builder.addCase(appSetStartedAction, appSetStarted)
  }
})
