import { RootState } from '../state'

const root = (state: RootState) => state.auth

const logonState = (state: RootState) => root(state).logonState
const logonToken = (state: RootState) => root(state).logonToken
const logonData = (state: RootState) => root(state).logonData
const logonError = (state: RootState) => root(state).logonError
const logoutState = (state: RootState) => root(state).logoutState
const logoutError = (state: RootState) => root(state).logoutError

export const AuthSelectors = {
  root,

  logonState,
  logonToken,
  logonData,
  logonError,

  logoutState,
  logoutError,
}
