import {
  createSlice
} from '@reduxjs/toolkit'

export const initialState = () => ({
  started: false
})

// START //

export const reduceAppStart = (state, action) => {
  state.started = true
}

// MAIN REDUCER //

const appSlice = createSlice({
  name: 'app',
  initialState: initialState(),

  reducers: {
    appStart: reduceAppStart
  }
})

appSlice.selectors = {
  appSelector: (state) => state.app,

  appStartSelector: (state) => appSlice.selectors.appSelector(state).started
}

export const {
  actions,
  reducer,
  selectors
} = appSlice

export default appSlice
