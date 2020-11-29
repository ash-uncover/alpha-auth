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

export const reduceRelationPatchFetch = (state, { payload }) => {
  const { id } = payload
  const relationState = getRelationState(state, id)
  relationState.status = DataStates.FETCHING
}
export const reduceRelationPatchSuccess = (state, { payload }) => {
  const { id, relation } = payload
  const relationState = getRelationState(state, id)
  relationState.data = relation
  relationState.error = null
  relationState.status = DataStates.SUCCESS
}
export const reduceRelationPatchFailure = (state, { payload }) => {
  const { id, error } = payload
  const relationState = getRelationState(state, id)
  relationState.data = null
  relationState.error = error
  relationState.status = DataStates.FAILURE
}

export const reduceRelationDeleteFetch = (state, { payload }) => {
  const { id } = payload
  const relationState = getRelationState(state, id)
  relationState.status = DataStates.FETCHING
}
export const reduceRelationDeleteSuccess = (state, { payload }) => {
  const { id, relation } = payload
  const relationState = getRelationState(state, id)
  relationState.data = relation
  relationState.error = null
  relationState.status = DataStates.SUCCESS
}
export const reduceRelationDeleteFailure = (state, { payload }) => {
  const { id, error } = payload
  const relationState = getRelationState(state, id)
  relationState.data = null
  relationState.error = error
  relationState.status = DataStates.FAILURE
}

export const reduceUserRelationsGetSuccess = (state, { payload }) => {
  const { relations } = payload
  relations.forEach((relation) => {
    const relationState = getRelationState(state, relation.id)
    relationState.data = relation
    relationState.error = null
    relationState.status = DataStates.SUCCESS
  })
}

export const reduceAuthLogoutSuccess = (state) => {
  state.data = {}
  state.status = DataStates.NEVER
  state.error = null
}

// MAIN REDUCER //

const relationsSlice = createSlice({
  name: 'relations',

  initialState: initialState(),

  reducers: {
    relationPatchFetch: reduceRelationPatchFetch,
    relationPatchSuccess: reduceRelationPatchSuccess,
    relationPatchFailure: reduceRelationPatchFailure,

    relationDeleteFetch: reduceRelationDeleteFetch,
    relationDeleteSuccess: reduceRelationDeleteSuccess,
    relationDeleteFailure: reduceRelationDeleteFailure
  },

  extraReducers: {
    'auth/authLogoutSuccess': reduceAuthLogoutSuccess,
    'users/userRelationsGetSuccess': reduceUserRelationsGetSuccess
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
