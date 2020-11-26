import { combineReducers } from 'redux'

import users from 'store/rest/users/usersReducer'

const reducer = combineReducers({
  users
})

export default reducer
