import {
  CaseReducer,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit'

import {
  AppState,
} from './app.state'

// STATE //

const initialState: AppState = {
  started: false
}

// REDUCERS //

export const start: CaseReducer<AppState, PayloadAction<void>> = (state, action) => {
  state.started = true
}

// SLICE //

export const AppSlice = createSlice({
  name: 'app',
  initialState,

  reducers: {
    start,
  },
})