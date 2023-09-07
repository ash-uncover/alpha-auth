import { UsersState } from './users/users.state'
import { AccountsState } from './accounts/accounts.state'

export type RestState = {
  accounts: AccountsState,
  users: UsersState,
}
