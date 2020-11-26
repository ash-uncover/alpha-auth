import { combineReducers } from 'redux'

import { reducer as app } from './app'
import { reducer as auth } from './auth'
import { reducer as rest } from './rest'

const reducer = combineReducers({
  app,
  auth,
  rest
})

export default reducer
