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

export const initialUserState = () => ({
  data: null,
  status: DataStates.NEVER,
  error: null,
  relationsData: null,
  relationsStatus: DataStates.NEVER,
  relationsError: null,
  threadsData: null,
  threadsStatus: DataStates.NEVER,
  threadsError: null
})

export const getUserState = (state, id) => {
  if (!state.data[id]) {
    state.data[id] = initialUserState()
  }
  return state.data[id]
}

// USER GET REDUCER //

export const reduceUserGetFetch = (state, { payload }) => {
  const { id } = payload
  const userState = getUserState(state, id)
  userState.error = null
  userState.status = userState.status === DataStates.NEVER ? DataStates.FETCHING_FIRST : DataStates.FETCHING
}
export const reduceUserGetSuccess = (state, { payload }) => {
  const { id, user } = payload
  const userState = getUserState(state, id)
  userState.data = user
  userState.error = null
  userState.status = DataStates.SUCCESS
}
export const reduceUserGetFailure = (state, { payload }) => {
  const { id, error } = payload
  const userState = getUserState(state, id)
  userState.data = null
  userState.error = error
  userState.status = DataStates.FAILURE
}

export const reduceUserPatchFetch = (state, { payload }) => {
  const { id } = payload
  const userState = getUserState(state, id)
  userState.status = DataStates.FETCHING
}
export const reduceUserPatchSuccess = (state, { payload }) => {
  const { id, user } = payload
  const userState = getUserState(state, id)
  userState.data = user
  userState.error = null
  userState.status = DataStates.SUCCESS
}
export const reduceUserPatchFailure = (state, { payload }) => {
  const { id, error } = payload
  const userState = getUserState(state, id)
  userState.data = null
  userState.error = error
  userState.status = DataStates.FAILURE
}

export const reduceUserRelationsGetFetch = (state, { payload }) => {
  const { id } = payload
  const userState = getUserState(state, id)
  userState.relationsStatus = userState.relationsStatus === DataStates.NEVER ? DataStates.FETCHING_FIRST : DataStates.FETCHING
}
export const reduceUserRelationsGetSuccess = (state, { payload }) => {
  const { id, relations } = payload
  const userState = getUserState(state, id)
  userState.relationsData = relations.map((relation) => relation.id)
  userState.relationsError = null
  userState.relationsStatus = DataStates.SUCCESS
}
export const reduceUserRelationsGetFailure = (state, { payload }) => {
  const { id, error } = payload
  const userState = getUserState(state, id)
  userState.relationsData = null
  userState.relationsError = error
  userState.relationsStatus = DataStates.FAILURE
}

export const reduceUserThreadsGetFetch = (state, { payload }) => {
  const { id } = payload
  const userState = getUserState(state, id)
  userState.threadsStatus = userState.threadsStatus === DataStates.NEVER ? DataStates.FETCHING_FIRST : DataStates.FETCHING
}
export const reduceUserThreadsGetSuccess = (state, { payload }) => {
  const { id, threads } = payload
  const userState = getUserState(state, id)
  userState.threadsData = threads.map((thread) => thread.id)
  userState.threadsError = null
  userState.threadsStatus = DataStates.SUCCESS
}
export const reduceUserThreadsGetFailure = (state, { payload }) => {
  const { id, error } = payload
  const userState = getUserState(state, id)
  userState.threadsData = null
  userState.threadsError = error
  userState.threadsStatus = DataStates.FAILURE
}

export const reduceAuthLogoutSuccess = (state) => {
  Object.assign(state, initialState())
}

// MAIN REDUCER //

const usersSlice = createSlice({
  name: 'users',

  initialState: initialState(),

  reducers: {
    userGetFetch: reduceUserGetFetch,
    userGetSuccess: reduceUserGetSuccess,
    userGetFailure: reduceUserGetFailure,

    userPatchFetch: reduceUserPatchFetch,
    userPatchSuccess: reduceUserPatchSuccess,
    userPatchFailure: reduceUserPatchFailure,

    userRelationsGetFetch: reduceUserRelationsGetFetch,
    userRelationsGetSuccess: reduceUserRelationsGetSuccess,
    userRelationsGetFailure: reduceUserRelationsGetFailure,

    userThreadsGetFetch: reduceUserThreadsGetFetch,
    userThreadsGetSuccess: reduceUserThreadsGetSuccess,
    userThreadsGetFailure: reduceUserThreadsGetFailure
  },

  extraReducers: {
    'auth/authLogoutSuccess': reduceAuthLogoutSuccess
  }
})

usersSlice.selectors = {
  restUsersSelector: (state) => restSelectors.restSelector(state).users,

  restUsersDataSelector: (state) => usersSlice.selectors.restUsersSelector(state).data,
  restUsersStatusSelector: (state) => usersSlice.selectors.restUsersSelector(state).status,
  restUsersErrorSelector: (state) => usersSlice.selectors.restUsersSelector(state).error,

  restUserSelector: (id) => (state) => usersSlice.selectors.restUsersDataSelector(state)[id] || initialUserState(),

  restUserDataSelector: (id) => (state) => usersSlice.selectors.restUserSelector(id)(state).data,
  restUserStatusSelector: (id) => (state) => usersSlice.selectors.restUserSelector(id)(state).status,
  restUserErrorSelector: (id) => (state) => usersSlice.selectors.restUserSelector(id)(state).error,

  restUserRelationsDataSelector: (id) => (state) => usersSlice.selectors.restUserSelector(id)(state).relationsData,
  restUserRelationsStatusSelector: (id) => (state) => usersSlice.selectors.restUserSelector(id)(state).relationsStatus,
  restUserRelationsErrorSelector: (id) => (state) => usersSlice.selectors.restUserSelector(id)(state).relationError,

  restUserThreadsDataSelector: (id) => (state) => usersSlice.selectors.restUserSelector(id)(state).threadsData,
  restUserThreadsStatusSelector: (id) => (state) => usersSlice.selectors.restUserSelector(id)(state).threadsStatus,
  restUserThreadsErrorSelector: (id) => (state) => usersSlice.selectors.restUserSelector(id)(state).threadError
}

export const {
  actions,
  reducer,
  selectors
} = usersSlice

export default usersSlice
