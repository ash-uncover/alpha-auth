import {
  CaseReducer,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit'

import {
  DataStates
} from '../../lib/constants'

import {
  AppState,
} from './app.state'

// STATE //

const initialState: AppState = {
  healthState: DataStates.NEVER,
  healthError: null,

  started: false
}

// REDUCERS //

export const checkHealthFetch: CaseReducer<AppState, PayloadAction<void>> = (state, action) => {
  state.healthState = state.healthState === DataStates.NEVER ? DataStates.FETCHING_FIRST : DataStates.FETCHING
}
export const checkHealthSuccess: CaseReducer<AppState, PayloadAction<void>> = (state, action) => {
  if (!state.started) {
    state.started = true
  }
  state.healthState = DataStates.SUCCESS
  if (state.healthError) {
    state.healthError = null
  }
}
export const checkHealthFailure: CaseReducer<AppState, PayloadAction<void>> = (state, action) => {
  if (!state.healthError) {
    state.healthError = 'Lost Connection to server'
  }
  state.healthState = DataStates.FAILURE
}

export const start: CaseReducer<AppState, PayloadAction<void>> = (state, action) => {
  state.started = true
}

// SLICE //

export const AppSlice = createSlice({
  name: 'app',
  initialState,

  reducers: {
    checkHealthFetch,
    checkHealthSuccess,
    checkHealthFailure,

    start,
  },
})