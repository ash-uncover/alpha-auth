import {
  AuthSlice
} from '../../store/auth/auth.slice'

import {
  Auth
} from './RestService'

export const logon = async (dispatch, { username, password }) => {
  dispatch(AuthSlice.actions.logonFetch())
  const token = `Basic ${window.btoa(unescape(encodeURIComponent(`${username}:${password}`)))}`
  return Auth.api.auth.get()
    .then(({ userId }) => {
      const result = { userId }
      dispatch(AuthSlice.actions.logonSuccess(result))
    })
    .catch((error) => {
      dispatch(AuthSlice.actions.logonFailure({ error }))
    })
}

export const logout = async (dispatch) => {
  dispatch(AuthSlice.actions.logoutFetch())
  return Auth.api.auth.delete()
    .then(() => {
      dispatch(AuthSlice.actions.logoutSuccess())
    })
    .catch((error) => {
      dispatch(AuthSlice.actions.logoutFailure({ error }))
    })
}

export const AuthService = {
  logon,
  logout,
}
