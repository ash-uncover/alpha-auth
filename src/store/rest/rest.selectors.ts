import {
  RootState
} from 'src/store/state'

const root = (state: RootState) => state.rest

export const RestSelectors = {
  root,
}