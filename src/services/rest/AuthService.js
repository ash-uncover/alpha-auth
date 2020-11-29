import {
  get,
  del
} from 'lib/RestHelper'

import { actions } from 'store/auth'

import LocalStorage, {
  ALPHA_AUTH_LOGON_DATA
} from 'lib/LocalStorage'

import CONFIG from 'configuration'

export const authGet = async (dispatch, { username, password }) => {
  dispatch(actions.authLogonFetch({ username, password }))
  const token = `Basic ${window.btoa(unescape(encodeURIComponent(`${username}:${password}`)))}`
  return get(`${CONFIG.ALPHA_AUTH_REST_URL}/auth`, token)
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
  return del(`${CONFIG.ALPHA_AUTH_REST_URL}/auth`, token)
    .then(() => {
      dispatch(actions.authLogoutSuccess({ token }))
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
