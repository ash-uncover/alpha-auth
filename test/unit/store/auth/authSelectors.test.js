import {
  authSelector,
  authLogonStateSelector,
  authLogonDataSelector,
  authLogonErrorSelector
} from 'store/auth/authSelectors'

describe('AuthSelectors', () => {
  describe('authSelector', () => {
    test('returns the expected state member', () => {
      const expected = { data: 'data' }
      const paramState = { auth: expected }

      const result = authSelector(paramState)

      expect(result).toEqual(expected)
    })
  })

  describe('authLogonStateSelector', () => {
    test('returns the expected state member', () => {
      const expected = { data: 'data' }
      const paramState = { auth: { logonState: expected } }

      const result = authLogonStateSelector(paramState)

      expect(result).toEqual(expected)
    })
  })

  describe('authLogonDataSelector', () => {
    test('returns the expected state member', () => {
      const expected = { data: 'data' }
      const paramState = { auth: { logonData: expected } }

      const result = authLogonDataSelector(paramState)

      expect(result).toEqual(expected)
    })
  })

  describe('authLogonErrorSelector', () => {
    test('returns the expected state member', () => {
      const expected = { data: 'data' }
      const paramState = { auth: { logonError: expected } }

      const result = authLogonErrorSelector(paramState)

      expect(result).toEqual(expected)
    })
  })
})
