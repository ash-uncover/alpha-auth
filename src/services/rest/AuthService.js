/* globals fetch, Headers */

import { actions as AuthActions } from 'store/auth'
import CONFIG from 'configuration'

export const authGet = async (dispatch, { username, password }) => {
  dispatch(AuthActions.authLogonFetch(username, password))

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
    .then((result) => {
      dispatch(AuthActions.authLogonSuccess(token, result))
    })
    .catch((error) => {
      dispatch(AuthActions.authLogonFailure(error))
    })
}

export const authDelete = async (dispatch, { token }) => {
  dispatch(AuthActions.authLogoutFetch(token))

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
        dispatch(AuthActions.authLogoutSuccess(token))
      } else {
        dispatch(AuthActions.authLogoutFailure({
          message: 'logoutFailed'
        }))
      }
    })
    .catch((error) => {
      dispatch(AuthActions.authLogoutFailure(error))
    })
}

const AuthService = {
  get: authGet,
  delete: authDelete
}

export default AuthService
