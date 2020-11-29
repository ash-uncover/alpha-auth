import {
  patch,
  del
} from 'lib/RestHelper'

import {
  actions
} from 'store/rest/relations'

import CONFIG from 'configuration'

export const relationPatch = async (dispatch, token, id, status) => {
  dispatch(actions.relationPatchFetch({ id }))
  return patch(`${CONFIG.ALPHA_AUTH_REST_URL}/rest/relations/${id}/${status.toLowerCase()}`, token)
    .then((relation) => {
      dispatch(actions.relationPatchSuccess({ id, relation }))
    })
    .catch((error) => {
      dispatch(actions.relationPatchFailure({ id, error }))
    })
}

export const relationDelete = async (dispatch, token, id) => {
  dispatch(actions.relationDeleteFetch({ id }))
  return del(`${CONFIG.ALPHA_AUTH_REST_URL}/rest/relations/${id}`, token)
    .then((relation) => {
      dispatch(actions.relationDeleteSuccess({ id, relation }))
    })
    .catch((error) => {
      dispatch(actions.relationDeleteFailure({ id, error }))
    })
}

const RelationsService = {
  patch: relationPatch,
  delete: relationDelete
}

export default RelationsService
