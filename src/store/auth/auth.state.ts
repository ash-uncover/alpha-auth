import {
  IDataState
} from '../../lib/constants/DataStates'

import {
  User
} from 'alpha-auth-common/build/services/auth/auth.model'

export interface AuthState {
  logonState: IDataState
  logonToken: string
  logonData: User
  logonError: string

  logoutState: IDataState
  logoutError: string
}