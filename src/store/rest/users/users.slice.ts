import {
  CaseReducer,
  createAction,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit'

import {
  UserState,
  UsersState
} from './users.state'

import {
  DataStates
} from '../../../lib/constants'

// STATE //

const getInitialState = (): UsersState => ({
  data: {},
  status: DataStates.NEVER,
  error: null
})

export const getInitialUserState = (): UserState => ({
  data: null,
  status: DataStates.NEVER,
  error: null,
})

const getUserState = (state: UsersState, id: string): UserState => {
  if (!state.data[id]) {
    state.data[id] = getInitialUserState()
  }
  return state.data[id]
}

// REDUCERS //

// GET /users/{userId}

interface GetUserFetchPayload {
  id: string
}
export const getUserFetch: CaseReducer<UsersState, PayloadAction<GetUserFetchPayload>> = (state, action) => {
  const { id } = action.payload
  const userState = getUserState(state, id)
  userState.error = null
  userState.status = userState.status === DataStates.NEVER ? DataStates.FETCHING_FIRST : DataStates.FETCHING
}
interface GetUserSuccessPayload {
  id: string
  user: any
}
export const getUserSuccess: CaseReducer<UsersState, PayloadAction<GetUserSuccessPayload>> = (state, action) => {
  const { id, user } = action.payload
  const userState = getUserState(state, id)
  userState.data = user
  userState.error = null
  userState.status = DataStates.SUCCESS
}
interface GetUserFailurePayload {
  id: string
  error: any
}
export const getUserFailure: CaseReducer<UsersState, PayloadAction<GetUserFailurePayload>> = (state, action) => {
  const { id, error } = action.payload
  const userState = getUserState(state, id)
  userState.data = null
  userState.error = error
  userState.status = DataStates.FAILURE
}

// POST /users/{userId}/avatar

interface PostUserAvatarFetchPayload {
  id: string
}
export const postUserAvatarFetch: CaseReducer<UsersState, PayloadAction<PostUserAvatarFetchPayload>> = (state, action) => {
  const { id } = action.payload
  const userState = getUserState(state, id)
  userState.status = DataStates.FETCHING
}
interface PostUserAvatarSuccessPayload {
  id: string
}
export const postUserAvatarSuccess: CaseReducer<UsersState, PayloadAction<PostUserAvatarSuccessPayload>> = (state, action) => {
  const { id } = action.payload
  const userState = getUserState(state, id)
  userState.error = null
  userState.status = DataStates.SUCCESS
}
interface PostUserAvatarFailurePayload {
  id: string
  error: any
}
export const postUserAvatarFailure: CaseReducer<UsersState, PayloadAction<PostUserAvatarFailurePayload>> = (state, action) => {
  const { id, error } = action.payload
  const userState = getUserState(state, id)
  userState.data = null
  userState.error = error
  userState.status = DataStates.FAILURE
}

// PATCH /users/{userId}

interface PatchUserFetchPayload {
  id: string
}
export const patchUserFetch: CaseReducer<UsersState, PayloadAction<PatchUserFetchPayload>> = (state, action) => {
  const { id } = action.payload
  const userState = getUserState(state, id)
  userState.status = DataStates.FETCHING
}
interface PatchUserSuccessPayload {
  id: string
  user: any
}
export const patchUserSuccess: CaseReducer<UsersState, PayloadAction<PatchUserSuccessPayload>> = (state, action) => {
  const { id, user } = action.payload
  const userState = getUserState(state, id)
  userState.data = user
  userState.error = null
  userState.status = DataStates.SUCCESS
}
interface PatchUserFailurePayload {
  id: string
  error: any
}
export const patchUserFailure: CaseReducer<UsersState, PayloadAction<PatchUserFailurePayload>> = (state, action) => {
  const { id, error } = action.payload
  const userState = getUserState(state, id)
  userState.data = null
  userState.error = error
  userState.status = DataStates.FAILURE
}

// Check session (external)

const authCheckSessionSuccessAction = createAction('auth/checkSessionSuccess')
const authCheckSessionSuccess = (state: UsersState, action) => {
  const { user } = action.payload
  const userState = getUserState(state, user.id)
  userState.data = user
  userState.error = null
  userState.status = DataStates.SUCCESS
}

// Logon (external)

const authLogonSuccessAction = createAction('auth/logonSuccess')
const authLogonSuccess = (state: UsersState, action) => {
  const { user } = action.payload.data
  const userState = getUserState(state, user.id)
  userState.data = user
  userState.error = null
  userState.status = DataStates.SUCCESS
}

// Logout (external)

const authLogoutSuccessAction = createAction('auth/logoutSuccess')
const authLogoutSuccess = (state: UsersState) => {
  Object.assign(state, getInitialState())
}

// Export SLICE //

export const UsersSlice = createSlice({
  name: 'users',
  initialState: getInitialState(),

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
  },

  extraReducers: (builder) => {
    builder.addCase(authCheckSessionSuccessAction, authCheckSessionSuccess)
    builder.addCase(authLogonSuccessAction, authLogonSuccess)
    builder.addCase(authLogoutSuccessAction, authLogoutSuccess)
  }
})