/* globals fetch, Headers */

import { actions as AuthActions } from 'store/auth'
import CONFIG from 'configuration'

export const authGet = async (dispatch, { username, password }) => {
  dispatch(AuthActions.authLogonFetch(username, password))

  const headers = new Headers()
  const token = `Basic ${window.btoa(unescape(encodeURIComponent(`${username}:${password}`)))}`
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
        dispatch(AuthActions.authLogonSuccess(token))
      } else {
        dispatch(AuthActions.authLogonFailure({
          message: 'connectionFailed'
        }))
      }
    })
    .catch((error) => {
      dispatch(AuthActions.authLogonFailure(error))
    })
}

const AuthService = {}

AuthService.api = {
  auth: {
    get: authGet
  }
}

export default AuthService
