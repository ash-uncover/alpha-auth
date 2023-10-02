import {
  CaseReducer,
  createAction,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit'

import {
  AccountsState
} from './accounts.state'

import {
  DataStates
} from '../../../lib/constants'

// STATE //

const getInitialState = (): AccountsState => ({
  data: {},
  status: DataStates.NEVER,
  error: null
})

// REDUCERS //

// GET /accounts/{accountId}

interface GetAccountFetchPayload {
  id: string
}
export const getAccountFetch: CaseReducer<AccountsState, PayloadAction<GetAccountFetchPayload>> = (state, action) => {
  state.error = null
  state.status = state.status === DataStates.NEVER ? DataStates.FETCHING_FIRST : DataStates.FETCHING
}
interface GetAccountSuccessPayload {
  account: any
}
export const getAccountSuccess: CaseReducer<AccountsState, PayloadAction<GetAccountSuccessPayload>> = (state, action) => {
  const { account } = action.payload
  state.data = account
  state.error = null
  state.status = DataStates.SUCCESS
}
interface GetAccountFailurePayload {
  error: any
}
export const getAccountFailure: CaseReducer<AccountsState, PayloadAction<GetAccountFailurePayload>> = (state, action) => {
  const { error } = action.payload
  state.data = null
  state.error = error
  state.status = DataStates.FAILURE
}

// POST /accounts/register

interface PostRegisterFetchPayload {
  username: string
}
export const postRegisterFetch: CaseReducer<AccountsState, PayloadAction<PostRegisterFetchPayload>> = (state, action) => {
  const { username } = action.payload
  state.data = {
    action: 'REGISTER',
    username,
  }
  state.status = DataStates.FETCHING
}
interface PostRegisterSuccessPayload {
}
export const postRegisterSuccess: CaseReducer<AccountsState, PayloadAction<PostRegisterSuccessPayload>> = (state, action) => {
  const {} = action.payload
  state.data = {
    ...state.data,
    action: 'REGISTER_VALIDATE',
  }
  state.error = null
  state.status = DataStates.SUCCESS
}
interface PostRegisterFailurePayload {
  error: any
}
export const postRegisterFailure: CaseReducer<AccountsState, PayloadAction<PostRegisterFailurePayload>> = (state, action) => {
  const { error } = action.payload
  state.error = error
  state.status = DataStates.FAILURE
}

// PUT /accounts/register

interface PutRegisterFetchPayload {
}
export const putRegisterFetch: CaseReducer<AccountsState, PayloadAction<PutRegisterFetchPayload>> = (state, action) => {
  const {} = action.payload
  state.status = DataStates.FETCHING
}
interface PutRegisterSuccessPayload {
}
export const putRegisterSuccess: CaseReducer<AccountsState, PayloadAction<PutRegisterSuccessPayload>> = (state, action) => {
  const {} = action.payload
  state.error = null
  state.status = DataStates.SUCCESS
}
interface PutRegisterFailurePayload {
  error: any
}
export const putRegisterFailure: CaseReducer<AccountsState, PayloadAction<PutRegisterFailurePayload>> = (state, action) => {
  const { error } = action.payload
  state.data = null
  state.error = error
  state.status = DataStates.FAILURE
}

// POST /accounts/recover

interface PostRecoverFetchPayload {
}
export const postRecoverFetch: CaseReducer<AccountsState, PayloadAction<PostRecoverFetchPayload>> = (state, action) => {
  const {} = action.payload
  state.status = DataStates.FETCHING
}
interface PostRecoverSuccessPayload {
}
export const postRecoverSuccess: CaseReducer<AccountsState, PayloadAction<PostRecoverSuccessPayload>> = (state, action) => {
  state.error = null
  state.status = DataStates.SUCCESS
}
interface PostRecoverFailurePayload {
  error: any
}
export const postRecoverFailure: CaseReducer<AccountsState, PayloadAction<PostRecoverFailurePayload>> = (state, action) => {
  const { error } = action.payload
  state.data = null
  state.error = error
  state.status = DataStates.FAILURE
}

// PUT /accounts/recover

interface PutRecoverFetchPayload {
}
export const putRecoverFetch: CaseReducer<AccountsState, PayloadAction<PutRecoverFetchPayload>> = (state, action) => {
  const {} = action.payload
  state.status = DataStates.FETCHING
}
interface PutRecoverSuccessPayload {
}
export const putRecoverSuccess: CaseReducer<AccountsState, PayloadAction<PutRecoverSuccessPayload>> = (state, action) => {
  const {} = action.payload
  state.error = null
  state.status = DataStates.SUCCESS
}
interface PutRecoverFailurePayload {
  error: any
}
export const putRecoverFailure: CaseReducer<AccountsState, PayloadAction<PutRecoverFailurePayload>> = (state, action) => {
  const { error } = action.payload
  state.data = null
  state.error = error
  state.status = DataStates.FAILURE
}

// POST /accounts/changemail

interface PostChangemailFetchPayload {
}
export const postChangemailFetch: CaseReducer<AccountsState, PayloadAction<PostChangemailFetchPayload>> = (state, action) => {
  const {} = action.payload
  state.status = DataStates.FETCHING
}
interface PostChangemailSuccessPayload {
}
export const postChangemailSuccess: CaseReducer<AccountsState, PayloadAction<PostChangemailSuccessPayload>> = (state, action) => {
  const {} = action.payload
  state.error = null
  state.status = DataStates.SUCCESS
}
interface PostChangemailFailurePayload {
  error: any
}
export const postChangemailFailure: CaseReducer<AccountsState, PayloadAction<PostChangemailFailurePayload>> = (state, action) => {
  const { error } = action.payload
  state.data = null
  state.error = error
  state.status = DataStates.FAILURE
}

// PUT /accounts/changemail

interface PutChangemailFetchPayload {
}
export const putChangemailFetch: CaseReducer<AccountsState, PayloadAction<PutChangemailFetchPayload>> = (state, action) => {
  const {} = action.payload
  state.status = DataStates.FETCHING
}
interface PutChangemailSuccessPayload {
}
export const putChangemailSuccess: CaseReducer<AccountsState, PayloadAction<PutChangemailSuccessPayload>> = (state, action) => {
  const {} = action.payload
  state.error = null
  state.status = DataStates.SUCCESS
}
interface PutChangemailFailurePayload {
  error: any
}
export const putChangemailFailure: CaseReducer<AccountsState, PayloadAction<PutChangemailFailurePayload>> = (state, action) => {
  const { error } = action.payload
  state.data = null
  state.error = error
  state.status = DataStates.FAILURE
}

// Logout (external)

const authLogoutSuccessAction = createAction('auth/logoutSuccess')
const authLogoutSuccess = (state: AccountsState) => {
  Object.assign(state, getInitialState())
}

// Export SLICE //

export const AccountsSlice = createSlice({
  name: 'accounts',
  initialState: getInitialState(),

  reducers: {
    getAccountFetch,
    getAccountSuccess,
    getAccountFailure,

    postRegisterFetch,
    postRegisterSuccess,
    postRegisterFailure,

    putRegisterFetch,
    putRegisterSuccess,
    putRegisterFailure,

    postRecoverFetch,
    postRecoverSuccess,
    postRecoverFailure,

    putRecoverFetch,
    putRecoverSuccess,
    putRecoverFailure,

    postChangemailFetch,
    postChangemailSuccess,
    postChangemailFailure,

    putChangemailFetch,
    putChangemailSuccess,
    putChangemailFailure,
  },

  extraReducers: (builder) => {
    builder.addCase(authLogoutSuccessAction, authLogoutSuccess)
  }
})