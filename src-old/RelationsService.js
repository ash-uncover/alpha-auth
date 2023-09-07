import {
  patch,
  del
} from 'lib/RestHelper'

import {
  actions
} from 'store/rest/relations'

import CONFIG from 'configuration'

export const patchRelation = async (dispatch, token, id, status) => {
  dispatch(actions.patchRelationFetch({ id }))
  return patch(`${CONFIG.ALPHA_AUTH_REST_URL}/rest/relations/${id}/${status.toLowerCase()}`, token)
    .then((relation) => {
      dispatch(actions.patchRelationSuccess({ id, relation }))
    })
    .catch((error) => {
      dispatch(actions.patchRelationFailure({ id, error }))
    })
}

export const deleteRelation = async (dispatch, token, id) => {
  dispatch(actions.deleteRelationFetch({ id }))
  return del(`${CONFIG.ALPHA_AUTH_REST_URL}/rest/relations/${id}`, token)
    .then((relation) => {
      dispatch(actions.deleteRelationSuccess({ id, relation }))
    })
    .catch((error) => {
      dispatch(actions.deleteRelationFailure({ id, error }))
    })
}

const RelationsService = {
  patch: patchRelation,
  delete: deleteRelation
}

export default RelationsService
