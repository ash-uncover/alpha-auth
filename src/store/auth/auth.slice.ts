import {
  CaseReducer,
  createAction,
  createSlice,
  PayloadAction
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

// STATE //

const getInitialState = () => ({
  logonState: DataStates.NEVER,
  logonData: null,
  logonError: null,
  logoutState: DataStates.NEVER,
  logoutError: null
})

const initialState = getInitialState()

// REDUCERS //

const setStartedAction = createAction('app/setStarted')
const setStarted = (state: AuthState, action) => {
  const storedData = LocalStorage.get(LocalStorageItem.ALPHA_AUTH_LOGON_DATA, null)
  const initialData = getInitialState()
  if (storedData && storedData.token && storedData.userId) {
    initialData.logonData = storedData
  }
  state.logonState = initialData.logonState
  state.logonData = initialData.logonData
  state.logonError = initialData.logonError
  state.logoutState = initialData.logoutState
  state.logoutError = initialData.logoutError
}


export const logonFetch: CaseReducer<AuthState, PayloadAction<void>> = (state) => {
  state.logonState = DataStates.FETCHING
}
interface LogonSuccessPayload {
  token: string
  userId: string
}
export const logonSuccess: CaseReducer<AuthState, PayloadAction<LogonSuccessPayload>> = (state, action) => {
  const { token, userId } = action.payload
  state.logonState = DataStates.SUCCESS
  state.logonData = { token, userId }
  state.logonError = null
}
interface LogonFailurePayload {
  error: any
}
export const logonFailure: CaseReducer<AuthState, PayloadAction<LogonFailurePayload>> = (state, action) => {
  const { error } = action.payload
  state.logonState = DataStates.FAILURE
  state.logonData = null
  state.logonError = error
}

export const logoutFetch: CaseReducer<AuthState, PayloadAction<void>> = (state) => {
  state.logoutState = DataStates.FETCHING
}
export const logoutSuccess: CaseReducer<AuthState, PayloadAction<void>> = (state) => {
  LocalStorage.remove(LocalStorageItem.ALPHA_AUTH_LOGON_DATA)
  state.logonState = DataStates.NEVER
  state.logonData = null
  state.logoutState = DataStates.NEVER
  state.logoutError = null
}
interface LogoutFailurePayload {
  error: any
}
export const logoutFailure: CaseReducer<AuthState, PayloadAction<LogoutFailurePayload>> = (state, action) => {
  const { error } = action.payload
  state.logonState = DataStates.NEVER
  state.logonData = null
  state.logoutState = DataStates.FAILURE
  state.logoutError = error
}

// MAIN REDUCER //

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    logonFetch,
    logonSuccess,
    logonFailure,

    logoutFetch,
    logoutSuccess,
    logoutFailure
  },

  extraReducers: (builder) => {
    builder.addCase(setStartedAction, setStarted)
  }
})
