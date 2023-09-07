import {
  AuthState
} from './auth.state'
import {
  AuthSelectors
} from './auth.selectors'
import {
  AuthSlice
} from './auth.slice'
import {
  RootState
} from '../state'

import {
  DataStates
} from '../../lib/constants'
import { User } from 'alpha-auth-common/build/services/auth/auth.model'

describe('AuthSelectors', () => {

  // @ts-ignore
  const ROOT_STATE_DEFAULT: RootState = {}
  const AUTH_STATE_DEFAULT: AuthState = AuthSlice.getInitialState()

  describe('root', () => {
    test('returns the expected state member', () => {
      // Declaration
      const expected: AuthState = {
         ...AUTH_STATE_DEFAULT,
         logonToken: 'test'
      }
      const paramState: RootState = {
        ...ROOT_STATE_DEFAULT,
        auth: expected
      }
      // Execution
      const result = AuthSelectors.root(paramState)
      // Assertion
      expect(result).toBe(expected)
    })
  })

  describe('logonState', () => {
    test('returns the expected state member', () => {
      // Declaration
      const logonState = DataStates.OUTDATED
      const paramState: RootState = {
        ...ROOT_STATE_DEFAULT,
        auth: {
          ...AUTH_STATE_DEFAULT,
          logonState
       }
      }
      // Execution
      const result = AuthSelectors.logonState(paramState)
      // Assertion
      expect(result).toBe(logonState)
    })
  })

  describe('logonToken', () => {
    test('returns the expected state member', () => {
      // Declaration
      const logonToken = 'MyToken'
      const paramState: RootState = {
        ...ROOT_STATE_DEFAULT,
        auth: {
          ...AUTH_STATE_DEFAULT,
          logonToken
       }
      }
      // Execution
      const result = AuthSelectors.logonToken(paramState)
      // Assertion
      expect(result).toBe(logonToken)
    })
  })

  describe('logonData', () => {
    test('returns the expected state member', () => {
      // Declaration
      const logonData: User = {
        id: 'userId'
      }
      const paramState: RootState = {
        ...ROOT_STATE_DEFAULT,
        auth: {
          ...AUTH_STATE_DEFAULT,
          logonData
       }
      }
      // Execution
      const result = AuthSelectors.logonData(paramState)
      // Assertion
      expect(result).toBe(logonData)
    })
  })

  describe('logonError', () => {
    test('returns the expected state member', () => {
      // Declaration
      const logonError = 'LogonError'
      const paramState: RootState = {
        ...ROOT_STATE_DEFAULT,
        auth: {
          ...AUTH_STATE_DEFAULT,
          logonError
       }
      }
      // Execution
      const result = AuthSelectors.logonError(paramState)
      // Assertion
      expect(result).toBe(logonError)
    })
  })

  describe('logoutState', () => {
    test('returns the expected state member', () => {
      // Declaration
      const logoutState = DataStates.OUTDATED
      const paramState: RootState = {
        ...ROOT_STATE_DEFAULT,
        auth: {
          ...AUTH_STATE_DEFAULT,
          logoutState
       }
      }
      // Execution
      const result = AuthSelectors.logoutState(paramState)
      // Assertion
      expect(result).toBe(logoutState)
    })
  })

  describe('logoutError', () => {
    test('returns the expected state member', () => {
      // Declaration
      const logoutError = 'LogoutError'
      const paramState: RootState = {
        ...ROOT_STATE_DEFAULT,
        auth: {
          ...AUTH_STATE_DEFAULT,
          logoutError
       }
      }
      // Execution
      const result = AuthSelectors.logoutError(paramState)
      // Assertion
      expect(result).toBe(logoutError)
    })
  })
})
