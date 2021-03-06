import { combineReducers } from 'redux'

import { reducer as relations } from 'store/rest/relations'
import { reducer as threads } from 'store/rest/threads'
import { reducer as users } from 'store/rest/users'

export const reducer = combineReducers({
  relations,
  threads,
  users
})

export const selectors = {
  restSelector: (state) => state.rest
}

export default {
  reducer,
  selectors
}
