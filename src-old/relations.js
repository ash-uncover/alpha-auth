import {
  createSlice
} from '@reduxjs/toolkit'

import {
  DataStates
} from 'lib/constants'

import {
  selectors as restSelectors
} from 'store/rest'

export const initialState = () => ({
  data: {},
  status: DataStates.NEVER,
  error: null
})

export const initialRelationState = () => ({
  data: null,
  status: DataStates.NEVER,
  error: null
})

export const getRelationState = (state, id) => {
  if (!state.data[id]) {
    state.data[id] = initialRelationState()
  }
  return state.data[id]
}

// PATCH RELATION REDUCER //

export const patchRelationFetch = (state, { payload }) => {
  const { id } = payload
  const relationState = getRelationState(state, id)
  relationState.status = DataStates.FETCHING
}
export const patchRelationSuccess = (state, { payload }) => {
  const { id, relation } = payload
  const relationState = getRelationState(state, id)
  relationState.data = relation
  relationState.error = null
  relationState.status = DataStates.SUCCESS
}
export const patchRelationFailure = (state, { payload }) => {
  const { id, error } = payload
  const relationState = getRelationState(state, id)
  relationState.data = null
  relationState.error = error
  relationState.status = DataStates.FAILURE
}

export const deleteRelationFetch = (state, { payload }) => {
  const { id } = payload
  const relationState = getRelationState(state, id)
  relationState.status = DataStates.FETCHING
}
export const deleteRelationSuccess = (state, { payload }) => {
  const { id } = payload
  delete state.data[id]
}
export const deleteRelationFailure = (state, { payload }) => {
  const { id, error } = payload
  const relationState = getRelationState(state, id)
  relationState.data = null
  relationState.error = error
  relationState.status = DataStates.FAILURE
}

export const getUserRelationsSuccess = (state, { payload }) => {
  const { relations } = payload
  relations.forEach((relation) => {
    const relationState = getRelationState(state, relation.id)
    relationState.data = relation
    relationState.error = null
    relationState.status = DataStates.SUCCESS
  })
}

export const authLogoutSuccess = (state) => {
  Object.assign(state, initialState())
}

// MAIN REDUCER //

const relationsSlice = createSlice({
  name: 'relations',

  initialState: initialState(),

  reducers: {
    patchRelationFetch,
    patchRelationSuccess,
    patchRelationFailure,

    deleteRelationFetch,
    deleteRelationSuccess,
    deleteRelationFailure
  },

  extraReducers: {
    'auth/authLogoutSuccess': authLogoutSuccess,
    'users/getUserRelationsSuccess': getUserRelationsSuccess
  }
})

export const selectRelations = (state) => restSelectors.selectRest(state).relations
export const selectRelationsData = (state) => selectRelations(state).data
export const selectRelationsStatus = (state) => selectRelations(state).status
export const selectRelationsError = (state) => selectRelations(state).error
export const selectRelation = (id) => (state) => selectRelationsData(state)[id] || initialRelationState()
export const selectRelationData = (id) => (state) => selectRelation(id)(state).data
export const selectRelationStatus = (id) => (state) => selectRelation(id)(state).status
export const selectRelationError = (id) => (state) => selectRelation(id)(state).error

relationsSlice.selectors = {
  selectRelations,
  selectRelationsData,
  selectRelationsStatus,
  selectRelationsError,
  selectRelation,
  selectRelationData,
  selectRelationStatus,
  selectRelationError
}

export const {
  actions,
  reducer,
  selectors
} = relationsSlice

export default relationsSlice
