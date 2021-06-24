import {
  createSlice
} from '@reduxjs/toolkit'

export const initialState = () => ({
  started: false
})

// START //

export const appStart = (state, action) => {
  state.started = true
}

// MAIN REDUCER //

const appSlice = createSlice({
  name: 'app',
  initialState: initialState(),

  reducers: {
    appStart: appStart
  }
})

export const selectApp = (state) => state.app
export const selectAppStart = (state) => selectApp(state).started

appSlice.selectors = {
  selectApp,
  selectAppStart
}

export const {
  actions,
  reducer,
  selectors
} = appSlice

export default appSlice
