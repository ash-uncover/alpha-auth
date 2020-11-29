import { combineReducers } from 'redux'

import { reducer as relations } from 'store/rest/relations'
import { reducer as users } from 'store/rest/users'

export const reducer = combineReducers({
  relations,
  users
})

export const selectors = {
  restSelector: (state) => state.rest
}

export default {
  reducer,
  selectors
}
