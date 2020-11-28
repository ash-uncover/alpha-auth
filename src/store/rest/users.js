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
  relationshipsData: null,
  relationshipsStatus: DataStates.NEVER,
  relationshipsError: null
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

export const reduceAuthLogoutSuccess = (state) => {
  state.data = {}
  state.status = DataStates.NEVER
  state.error = null
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
    userPatchFailure: reduceUserPatchFailure
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
  restUserErrorSelector: (id) => (state) => usersSlice.selectors.restUserSelector(id)(state).error
}

export const {
  actions,
  reducer,
  selectors
} = usersSlice

export default usersSlice
