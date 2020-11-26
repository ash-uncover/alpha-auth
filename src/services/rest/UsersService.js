/* globals fetch, Headers */

import { actions as UsersActions } from 'store/rest/users'
import CONFIG from 'configuration'

export const userGet = async (dispatch, token, id) => {
  dispatch(UsersActions.userGetFetch(id))

  const headers = new Headers()
  headers.append('Authorization', token)

  return fetch(
    `${CONFIG.ALPHA_AUTH_REST_URL}/users/${id}`,
    {
      method: 'GET',
      headers
    }
  )
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        dispatch(UsersActions.userGetSuccess(response))
      } else {
        dispatch(UsersActions.userGetFailure({
          message: 'connectionFailed'
        }))
      }
    })
    .catch((error) => {
      dispatch(UsersActions.userGetFailure(error))
    })
}

const UsersService = {
  get: userGet
}

export default UsersService
