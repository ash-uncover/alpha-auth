export const AUTH_LOGON_FETCH = '@@AUTH/LOGON_FETCH'
export const AUTH_LOGON_SUCCESS = '@@AUTH/LOGON_SUCCESS'
export const AUTH_LOGON_FAILURE = '@@AUTH/LOGON_FAILURE'
export const authLogonFetch = () => ({
  type: AUTH_LOGON_FETCH,
  payload: {}
})
export const authLogonSuccess = (token, { userId }) => ({
  type: AUTH_LOGON_SUCCESS,
  payload: { token, userId }
})
export const authLogonFailure = (error) => ({
  type: AUTH_LOGON_FAILURE,
  payload: { error }
})

export const AUTH_LOGON_RESET = '@@AUTH/LOGON_RESET'
export const authLogonReset = () => ({
  type: AUTH_LOGON_RESET,
  payload: {}
})

export const AUTH_LOGOUT_FETCH = '@@AUTH/LOGOUT_FETCH'
export const AUTH_LOGOUT_SUCCESS = '@@AUTH/LOGOUT_SUCCESS'
export const AUTH_LOGOUT_FAILURE = '@@AUTH/LOGOUT_FAILURE'
export const authLogoutFetch = () => ({
  type: AUTH_LOGOUT_FETCH,
  payload: {}
})
export const authLogoutSuccess = () => ({
  type: AUTH_LOGOUT_SUCCESS,
  payload: {}
})
export const authLogoutFailure = (error) => ({
  type: AUTH_LOGOUT_FAILURE,
  payload: { error }
})
