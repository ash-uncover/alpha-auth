import {
  IDataState
} from '../../lib/constants/DataStates'

export interface AppState {
  healthState: IDataState
  healthError: string

  started: boolean
}