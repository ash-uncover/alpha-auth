import {
  get,
  postImage,
  patch
} from 'lib/RestHelper'

import {
  actions
} from 'store/rest/users'

import CONFIG from 'configuration'

export const getUser = async (dispatch, token, id) => {
  dispatch(actions.getUserFetch({ id }))
  return get(`${CONFIG.ALPHA_AUTH_REST_URL}/rest/users/${id}`, token)
    .then((user) => {
      dispatch(actions.getUserSuccess({ id, user }))
    })
    .catch((error) => {
      dispatch(actions.getUserFailure({ id, error }))
    })
}

export const postUserAvatar = async (dispatch, token, id, file) => {
  dispatch(actions.postUserAvatarFetch({ id }))
  return postImage(`${CONFIG.ALPHA_AUTH_REST_URL}/rest/users/${id}/avatar`, token, file)
    .then(() => {
      dispatch(actions.postUserAvatarSuccess({ id }))
    })
    .catch((error) => {
      dispatch(actions.postUserAvatarFailure({ id, error }))
    })
}

export const patchUser = async (dispatch, token, id, data) => {
  dispatch(actions.patchUserFetch({ id }))
  return patch(`${CONFIG.ALPHA_AUTH_REST_URL}/rest/users/${id}`, token, data)
    .then((user) => {
      dispatch(actions.patchUserSuccess({ id, user }))
    })
    .catch((error) => {
      dispatch(actions.patchUserFailure({ id, error }))
    })
}

export const getUserRelations = async (dispatch, token, id) => {
  dispatch(actions.getUserRelationsFetch({ id }))
  return get(`${CONFIG.ALPHA_AUTH_REST_URL}/rest/users/${id}/relations`, token)
    .then((relations) => {
      dispatch(actions.getUserRelationsSuccess({ id, relations }))
    })
    .catch((error) => {
      dispatch(actions.getUserRelationsFailure({ id, error }))
    })
}

export const getUserThreads = async (dispatch, token, id) => {
  dispatch(actions.getUserThreadsFetch({ id }))
  return get(`${CONFIG.ALPHA_AUTH_REST_URL}/rest/users/${id}/threads`, token)
    .then((threads) => {
      dispatch(actions.getUserThreadsSuccess({ id, threads }))
    })
    .catch((error) => {
      dispatch(actions.getUserThreadsFailure({ id, error }))
    })
}

const UsersService = {
  get: getUser,
  patch: patchUser,
  postAvatar: postUserAvatar,
  getRelations: getUserRelations,
  getThreads: getUserThreads
}

export default UsersService
