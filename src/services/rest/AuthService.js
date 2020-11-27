/* globals fetch, Headers */

import { actions } from 'store/auth'

import LocalStorage, {
  ALPHA_AUTH_LOGON_DATA
} from 'lib/LocalStorage'

import CONFIG from 'configuration'

export const authGet = async (dispatch, { username, password }) => {
  dispatch(actions.authLogonFetch({ username, password }))

  const token = `Basic ${window.btoa(unescape(encodeURIComponent(`${username}:${password}`)))}`

  const headers = new Headers()
  headers.append('Accept', 'application/json')
  headers.append('Content-Type', 'application/json')
  headers.append('Authorization', token)

  return fetch(
    `${CONFIG.ALPHA_AUTH_REST_URL}/auth`,
    {
      method: 'GET',
      headers
    }
  )
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json()
      }
      throw new Error('connectionFailed')
    })
    .then(({ userId }) => {
      const result = { token, userId }
      LocalStorage.set(ALPHA_AUTH_LOGON_DATA, result)
      dispatch(actions.authLogonSuccess(result))
    })
    .catch((error) => {
      dispatch(actions.authLogonFailure({ error }))
    })
}

export const authDelete = async (dispatch, { token }) => {
  dispatch(actions.authLogoutFetch({ token }))

  const headers = new Headers()
  headers.append('Authorization', token)

  return fetch(
    `${CONFIG.ALPHA_AUTH_REST_URL}/auth`,
    {
      method: 'DELETE',
      headers
    }
  )
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        LocalStorage.remove(ALPHA_AUTH_LOGON_DATA)
        dispatch(actions.authLogoutSuccess({ token }))
      } else {
        dispatch(actions.authLogoutFailure({
          message: 'logoutFailed'
        }))
      }
    })
    .catch((error) => {
      dispatch(actions.authLogoutFailure({ error }))
    })
}

const AuthService = {
  get: authGet,
  delete: authDelete
}

export default AuthService
