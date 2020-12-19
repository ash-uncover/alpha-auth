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

export const selectThreads = (state) => restSelectors.selectRest(state).relations
export const selectThreadsData = (state) => selectThreads(state).data
export const selectThreadsStatus = (state) => selectThreads(state).status
export const selectThreadsError = (state) => selectThreads(state).error
export const selectThread = (id) => (state) => selectThreadsData(state)[id] || initialThreadState()
export const selectThreadData = (id) => (state) => selectThread(id)(state).data
export const selectThreadStatus = (id) => (state) => selectThread(id)(state).status
export const selectThreadError = (id) => (state) => selectThread(id)(state).error

relationsSlice.selectors = {
  selectThreads,
  selectThreadsData,
  selectThreadsStatus,
  selectThreadsError,
  selectThread,
  selectThreadData,
  selectThreadStatus,
  selectThreadError
}

export const {
  actions,
  reducer,
  selectors
} = relationsSlice

export default relationsSlice
