export const AUTH_LOGON_FETCH = '@@AUTH/LOGON_FETCH'
export const authLogonFetch = () => {
  return {
    type: AUTH_LOGON_FETCH,
    payload: {}
  }
}

export const AUTH_LOGON_SUCCESS = '@@AUTH/LOGON_SUCCESS'
export const authLogonSuccess = (token) => {
  return {
    type: AUTH_LOGON_SUCCESS,
    payload: { token }
  }
}

export const AUTH_LOGON_FAILURE = '@@AUTH/LOGON_FAILURE'
export const authLogonFailure = (error) => {
  return {
    type: AUTH_LOGON_FAILURE,
    payload: { error }
  }
}

export const AUTH_LOGOUT_FETCH = '@@AUTH/LOGOUT_FETCH'
export const authLogoutFetch = () => {
  return {
    type: AUTH_LOGOUT_FETCH,
    payload: {}
  }
}

export const AUTH_LOGOUT_SUCCESS = '@@AUTH/LOGOUT_SUCCESS'
export const authLogoutSuccess = (token) => {
  return {
    type: AUTH_LOGOUT_SUCCESS,
    payload: {}
  }
}

export const AUTH_LOGOUT_FAILURE = '@@AUTH/LOGOUT_FAILURE'
export const authLogoutFailure = (error) => {
  return {
    type: AUTH_LOGOUT_FAILURE,
    payload: { error }
  }
}
