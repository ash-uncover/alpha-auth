import { RootState } from '../state'

const base = (state: RootState) => state.auth

const logonState = (state: RootState) => base(state).logonState
const logonData = (state: RootState) => base(state).logonData
const logonError = (state: RootState) => base(state).logonError
const token = (state: RootState) => logonData(state).token
const userId = (state: RootState) => logonData(state).userId
const logoutState = (state: RootState) => base(state).logoutState
const logoutError = (state: RootState) => base(state).logoutError

export const AppSelectors = {
  logonState,
  logonData,
  logonError,
  token,
  userId,
  logoutState,
  logoutError,
}
