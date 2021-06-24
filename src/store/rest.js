import { combineReducers } from 'redux'

import { reducer as relations } from 'store/rest/relations'
import { reducer as threads } from 'store/rest/threads'
import { reducer as users } from 'store/rest/users'

export const reducer = combineReducers({
  relations,
  threads,
  users
})

export const selectRest = (state) => state.rest

export const selectors = {
  selectRest
}

export default {
  reducer,
  selectors
}
