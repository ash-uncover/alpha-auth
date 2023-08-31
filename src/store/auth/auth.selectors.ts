import { RootState } from '../state'

const root = (state: RootState) => state.auth

const logonState = (state: RootState) => root(state).logonState
const logonData = (state: RootState) => root(state).logonData
const logonError = (state: RootState) => root(state).logonError
const token = (state: RootState) => logonData(state).token
const userId = (state: RootState) => logonData(state).userId
const logoutState = (state: RootState) => root(state).logoutState
const logoutError = (state: RootState) => root(state).logoutError

export const AuthSelectors = {
  root,

  logonState,
  logonData,
  logonError,
  token,
  userId,
  logoutState,
  logoutError,
}
