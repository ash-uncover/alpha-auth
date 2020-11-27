/* globals fetch, Headers */

import {
  actions
} from 'store/rest/users'

import CONFIG from 'configuration'

export const userGet = async (dispatch, token, id) => {
  dispatch(actions.userGetFetch({ id }))

  const headers = new Headers()
  headers.append('Accept', 'application/json')
  headers.append('Content-Type', 'application/json')
  headers.append('Authorization', token)

  return fetch(
    `${CONFIG.ALPHA_AUTH_REST_URL}/rest/users/${id}`,
    {
      method: 'GET',
      headers
    }
  )
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json()
      }
      throw new Error(response)
    })
    .then((user) => {
      dispatch(actions.userGetSuccess({ id, user }))
    })
    .catch((error) => {
      dispatch(actions.userGetFailure({ id, error }))
    })
}

const UsersService = {
  get: userGet
}

export default UsersService
