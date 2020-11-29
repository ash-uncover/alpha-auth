import {
  get,
  patch
} from 'lib/RestHelper'

import {
  actions
} from 'store/rest/users'

import CONFIG from 'configuration'

export const userGet = async (dispatch, token, id) => {
  dispatch(actions.userGetFetch({ id }))
  return get(`${CONFIG.ALPHA_AUTH_REST_URL}/rest/users/${id}`, token)
    .then((user) => {
      dispatch(actions.userGetSuccess({ id, user }))
    })
    .catch((error) => {
      dispatch(actions.userGetFailure({ id, error }))
    })
}

export const userPatch = async (dispatch, token, id, data) => {
  dispatch(actions.userGetFetch({ id }))
  return patch(`${CONFIG.ALPHA_AUTH_REST_URL}/rest/users/${id}`, token, data)
    .then((user) => {
      dispatch(actions.userGetSuccess({ id, user }))
    })
    .catch((error) => {
      dispatch(actions.userGetFailure({ id, error }))
    })
}

export const userRelationsGet = async (dispatch, token, id) => {
  dispatch(actions.userRelationsGetFetch({ id }))
  return get(`${CONFIG.ALPHA_AUTH_REST_URL}/rest/users/${id}/relations`, token)
    .then((relations) => {
      dispatch(actions.userRelationsGetSuccess({ id, relations }))
    })
    .catch((error) => {
      dispatch(actions.userRelationsGetFailure({ id, error }))
    })
}

const UsersService = {
  get: userGet,
  patch: userPatch,
  getRelations: userRelationsGet
}

export default UsersService
