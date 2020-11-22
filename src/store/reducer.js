import { combineReducers } from 'redux'

import { reducer as AppReducer } from './app'
import { reducer as AuthReducer } from './auth'

const reducer = combineReducers({
  app: AppReducer,
  auth: AuthReducer
})

export default reducer
