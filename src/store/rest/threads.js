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

export const initialThreadState = () => ({
  data: null,
  status: DataStates.NEVER,
  error: null
})

export const getThreadState = (state, id) => {
  if (!state.data[id]) {
    state.data[id] = initialThreadState()
  }
  return state.data[id]
}

// PATCH RELATION REDUCER //

export const getUserThreadsSuccess = (state, { payload }) => {
  const { threads } = payload
  threads.forEach((relation) => {
    const threadState = getThreadState(state, relation.id)
    threadState.data = relation
    threadState.error = null
    threadState.status = DataStates.SUCCESS
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
  },

  extraReducers: {
    'auth/authLogoutSuccess': authLogoutSuccess,
    'users/getUserThreadsSuccess': getUserThreadsSuccess
  }
})

relationsSlice.selectors = {
  restThreadsSelector: (state) => restSelectors.restSelector(state).relations,

  restThreadsDataSelector: (state) => relationsSlice.selectors.restThreadsSelector(state).data,
  restThreadsStatusSelector: (state) => relationsSlice.selectors.restThreadsSelector(state).status,
  restThreadsErrorSelector: (state) => relationsSlice.selectors.restThreadsSelector(state).error,

  restThreadSelector: (id) => (state) => relationsSlice.selectors.restThreadsDataSelector(state)[id] || initialThreadState(),

  restThreadDataSelector: (id) => (state) => relationsSlice.selectors.restThreadSelector(id)(state).data,
  restThreadStatusSelector: (id) => (state) => relationsSlice.selectors.restThreadSelector(id)(state).status,
  restThreadErrorSelector: (id) => (state) => relationsSlice.selectors.restThreadSelector(id)(state).error
}

export const {
  actions,
  reducer,
  selectors
} = relationsSlice

export default relationsSlice
