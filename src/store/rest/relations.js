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
  const { id, relation } = payload
  const relationState = getRelationState(state, id)
  relationState.data = relation
  relationState.error = null
  relationState.status = DataStates.SUCCESS
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

relationsSlice.selectors = {
  restRelationsSelector: (state) => restSelectors.restSelector(state).relations,

  restRelationsDataSelector: (state) => relationsSlice.selectors.restRelationsSelector(state).data,
  restRelationsStatusSelector: (state) => relationsSlice.selectors.restRelationsSelector(state).status,
  restRelationsErrorSelector: (state) => relationsSlice.selectors.restRelationsSelector(state).error,

  restRelationSelector: (id) => (state) => relationsSlice.selectors.restRelationsDataSelector(state)[id] || initialRelationState(),

  restRelationDataSelector: (id) => (state) => relationsSlice.selectors.restRelationSelector(id)(state).data,
  restRelationStatusSelector: (id) => (state) => relationsSlice.selectors.restRelationSelector(id)(state).status,
  restRelationErrorSelector: (id) => (state) => relationsSlice.selectors.restRelationSelector(id)(state).error
}

export const {
  actions,
  reducer,
  selectors
} = relationsSlice

export default relationsSlice
