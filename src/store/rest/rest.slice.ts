import { combineReducers } from 'redux'

import { AccountsSlice } from './accounts/accounts.slice'
import { UsersSlice } from './users/users.slice'

export const RestSlice = combineReducers({
  accounts: AccountsSlice.reducer,
  users: UsersSlice.reducer,
})
