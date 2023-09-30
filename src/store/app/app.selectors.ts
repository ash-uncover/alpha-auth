import { RootState } from '../state'

const root = (state: RootState) => state.app

const started = (state: RootState) => root(state).started
const healthState = (state: RootState) => root(state).healthState

export const AppSelectors = {
  root,

  healthState,
  started,
}
