import { RootState } from '../state'

const root = (state: RootState) => state.app

const started = (state: RootState) => root(state).started

export const AppSelectors = {
  root,

  started,
}
