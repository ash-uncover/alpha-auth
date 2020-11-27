import { combineReducers } from 'redux'

import { reducer as users } from 'store/rest/users'

export const reducer = combineReducers({
  users
})

export const selectors = {
  restSelector: (state) => state.rest
}

export default {
  reducer,
  selectors
}
