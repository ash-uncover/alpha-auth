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

export const getUserFetch = (state, { payload }) => {
  const { id } = payload
  const userState = getUserState(state, id)
  userState.error = null
  userState.status = userState.status === DataStates.NEVER ? DataStates.FETCHING_FIRST : DataStates.FETCHING
}
export const getUserSuccess = (state, { payload }) => {
  const { id, user } = payload
  const userState = getUserState(state, id)
  userState.data = user
  userState.error = null
  userState.status = DataStates.SUCCESS
}
export const getUserFailure = (state, { payload }) => {
  const { id, error } = payload
  const userState = getUserState(state, id)
  userState.data = null
  userState.error = error
  userState.status = DataStates.FAILURE
}

export const postUserAvatarFetch = (state, { payload }) => {
  const { id } = payload
  const userState = getUserState(state, id)
  userState.status = DataStates.FETCHING
}
export const postUserAvatarSuccess = (state, { payload }) => {
  const { id } = payload
  const userState = getUserState(state, id)
  userState.error = null
  userState.status = DataStates.SUCCESS
}
export const postUserAvatarFailure = (state, { payload }) => {
  const { id, error } = payload
  const userState = getUserState(state, id)
  userState.data = null
  userState.error = error
  userState.status = DataStates.FAILURE
}

export const patchUserFetch = (state, { payload }) => {
  const { id } = payload
  const userState = getUserState(state, id)
  userState.status = DataStates.FETCHING
}
export const patchUserSuccess = (state, { payload }) => {
  const { id, user } = payload
  const userState = getUserState(state, id)
  userState.data = user
  userState.error = null
  userState.status = DataStates.SUCCESS
}
export const patchUserFailure = (state, { payload }) => {
  const { id, error } = payload
  const userState = getUserState(state, id)
  userState.data = null
  userState.error = error
  userState.status = DataStates.FAILURE
}

export const getUserRelationsFetch = (state, { payload }) => {
  const { id } = payload
  const userState = getUserState(state, id)
  userState.relationsStatus = userState.relationsStatus === DataStates.NEVER ? DataStates.FETCHING_FIRST : DataStates.FETCHING
}
export const getUserRelationsSuccess = (state, { payload }) => {
  const { id, relations } = payload
  const userState = getUserState(state, id)
  userState.relationsData = relations.map((relation) => relation.id)
  userState.relationsError = null
  userState.relationsStatus = DataStates.SUCCESS
}
export const getUserRelationsFailure = (state, { payload }) => {
  const { id, error } = payload
  const userState = getUserState(state, id)
  userState.relationsData = null
  userState.relationsError = error
  userState.relationsStatus = DataStates.FAILURE
}

export const getUserThreadsFetch = (state, { payload }) => {
  const { id } = payload
  const userState = getUserState(state, id)
  userState.threadsStatus = userState.threadsStatus === DataStates.NEVER ? DataStates.FETCHING_FIRST : DataStates.FETCHING
}
export const getUserThreadsSuccess = (state, { payload }) => {
  const { id, threads } = payload
  const userState = getUserState(state, id)
  userState.threadsData = threads.map((thread) => thread.id)
  userState.threadsError = null
  userState.threadsStatus = DataStates.SUCCESS
}
export const getUserThreadsFailure = (state, { payload }) => {
  const { id, error } = payload
  const userState = getUserState(state, id)
  userState.threadsData = null
  userState.threadsError = error
  userState.threadsStatus = DataStates.FAILURE
}

export const authLogoutSuccess = (state) => {
  Object.assign(state, initialState())
}

// MAIN REDUCER //

const usersSlice = createSlice({
  name: 'users',

  initialState: initialState(),

  reducers: {
    getUserFetch,
    getUserSuccess,
    getUserFailure,

    postUserAvatarFetch,
    postUserAvatarSuccess,
    postUserAvatarFailure,

    patchUserFetch,
    patchUserSuccess,
    patchUserFailure,

    getUserRelationsFetch,
    getUserRelationsSuccess,
    getUserRelationsFailure,

    getUserThreadsFetch,
    getUserThreadsSuccess,
    getUserThreadsFailure
  },

  extraReducers: {
    'auth/authLogoutSuccess': authLogoutSuccess
  }
})

export const selectUsers = (state) => restSelectors.selectRest(state).users
export const selectUsersData = (state) => selectUsers(state).data
export const selectUsersStatus = (state) => selectUsers(state).status
export const selectUsersError = (state) => selectUsers(state).error
export const selectUser = (id) => (state) => selectUsersData(state)[id] || initialUserState()
export const selectUserData = (id) => (state) => selectUser(id)(state).data
export const selectUserStatus = (id) => (state) => selectUser(id)(state).status
export const selectUserError = (id) => (state) => selectUser(id)(state).error
export const selectUserRelationsData = (id) => (state) => selectUser(id)(state).relationsData
export const selectUserRelationsStatus = (id) => (state) => selectUser(id)(state).relationsStatus
export const selectUserRelationsError = (id) => (state) => selectUser(id)(state).relationError
export const selectUserThreadsData = (id) => (state) => selectUser(id)(state).threadsData
export const selectUserThreadsStatus = (id) => (state) => selectUser(id)(state).threadsStatus
export const selectUserThreadsError = (id) => (state) => selectUser(id)(state).threadError

usersSlice.selectors = {
  selectUsers,
  selectUsersData,
  selectUsersStatus,
  selectUsersError,
  selectUser,
  selectUserData,
  selectUserStatus,
  selectUserError,
  selectUserRelationsData,
  selectUserRelationsStatus,
  selectUserRelationsError,
  selectUserThreadsData,
  selectUserThreadsStatus,
  selectUserThreadsError
}

export const {
  actions,
  reducer,
  selectors
} = usersSlice

export default usersSlice
