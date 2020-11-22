export const AUTH_LOGON_FETCH = '@@AUTH/LOGON_FETCH'
export const AUTH_LOGON_SUCCESS = '@@AUTH/LOGON_SUCCESS'
export const AUTH_LOGON_FAILURE = '@@AUTH/LOGON_FAILURE'

export const authLogonFetch = () => {
  return {
    type: AUTH_LOGON_FETCH,
    payload: {}
  }
}

export const authLogonSuccess = (token) => {
  return {
    type: AUTH_LOGON_SUCCESS,
    payload: { token }
  }
}

export const authLogonFailure = (error) => {
  return {
    type: AUTH_LOGON_FAILURE,
    payload: { error }
  }
}
