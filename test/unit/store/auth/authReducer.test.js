import {
  reduceAuthLogonFetch,
  reduceAuthLogonSuccess,
  reduceAuthLogonFailure
} from 'store/auth/authReducer'

import {
  DataStates
} from 'lib/constants'

describe('AuthReducer', () => {
  describe('reduceAuthLogonFetch', () => {
    test('sets fetching state to true', () => {
      const paramState = {}
      const paramPayload = null

      const result = reduceAuthLogonFetch(paramState, paramPayload)

      const expected = {
        logonState: DataStates.FETCHING
      }

      expect(result).toEqual(expected)
    })
  })

  describe('reduceAuthLogonSuccess', () => {
    test('sets the proper state', () => {
      const paramState = {
        logonState: DataStates.FETCHING
      }
      const paramPayload = {
        token: 'token'
      }

      const result = reduceAuthLogonSuccess(paramState, paramPayload)

      const expected = {
        logonState: DataStates.SUCCESS,
        logonData: { token: 'token' },
        logonError: null
      }

      expect(result).toEqual(expected)
    })
  })

  describe('reduceAuthLogonFailure', () => {
    test('sets the proper state', () => {
      const paramState = {
        logonState: DataStates.FETCHING
      }
      const paramPayload = {
        error: 'error'
      }

      const result = reduceAuthLogonFailure(paramState, paramPayload)

      const expected = {
        logonState: DataStates.FAILURE,
        logonData: null,
        logonError: 'error'
      }

      expect(result).toEqual(expected)
    })
  })
})
