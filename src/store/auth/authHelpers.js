import {
  actions as AuthActions
} from 'store/auth'

import {
  AuthService
} from 'services'

export const doLogin = (dispatch, user, pass) => {
  dispatch(AuthActions.authLogonFetch())
  return AuthService.api.logon.post(user, pass)
    .then((logonToken) => {
      dispatch(AuthActions.authLogonSuccess(logonToken))
    })
    .catch((error) => {
      dispatch(AuthActions.authLogonFailure(error))
    })
}
