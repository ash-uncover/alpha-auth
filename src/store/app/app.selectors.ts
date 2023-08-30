import { RootState } from '../state'

const base = (state: RootState) => state.app

const started = (state: RootState) => base(state).started

export const AppSelectors = {
  started,
}
