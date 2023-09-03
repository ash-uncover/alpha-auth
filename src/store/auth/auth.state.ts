import {
  IDataState
} from '../../lib/constants/DataStates'

export interface AuthState {
  logonState: IDataState
  logonData: {
    token: string
    userId: string
  }
  logonError: string

  logoutState: IDataState
  logoutError: string
}