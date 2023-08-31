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

export const setStarted: CaseReducer<AppState, PayloadAction<boolean>> = (state, action) => {
  state.started = action.payload
}

// SLICE //

export const AppSlice = createSlice({
  name: 'app',
  initialState,

  reducers: {
    setStarted,
  },
})