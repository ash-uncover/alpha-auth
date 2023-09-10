import {
  AuthSlice
} from './auth.slice'
import {
  AuthState
} from './auth.state'

import {
  DataStates
} from '../../lib/constants'
import store from '..'

describe('AuthSlice', () => {

  const AUTH_STATE_DEFAULT: AuthState = AuthSlice.getInitialState()

  describe('checkSessionFetch', () => {
    test('sets fetching state to true', () => {
      // Execution
      store.dispatch(AuthSlice.actions.checkSessionFetch())
      // Assertion
      const expected = {
        ...AUTH_STATE_DEFAULT,
        logonState: DataStates.FETCHING
      }
      expect(store.getState().auth).toEqual(expected)
    })
  })
})
