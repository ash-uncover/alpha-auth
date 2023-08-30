
type DataStateId =
  'FAILURE' |
  'FETCHING' |
  'FETCHING_FIRST' |
  'NEVER' |
  'OUTDATED' |
  'SUCCESS'

export interface IDataState {
  id: DataStateId
  loaded: boolean
  loading: boolean
  latest: boolean
  error: boolean
}

export const DataStates: {
  FAILURE: IDataState
  FETCHING: IDataState
  FETCHING_FIRST: IDataState
  NEVER: IDataState
  OUTDATED: IDataState
  SUCCESS: IDataState
} = {
  FAILURE: {
    id: 'FAILURE',
    loaded: true,
    loading: false,
    latest: true,
    error: true
  },
  FETCHING: {
    id: 'FETCHING',
    loaded: true,
    loading: true,
    latest: false,
    error: false
  },
  FETCHING_FIRST: {
    id: 'FETCHING_FIRST',
    loaded: false,
    loading: true,
    latest: false,
    error: false
  },
  NEVER: {
    id: 'NEVER',
    loaded: false,
    loading: false,
    latest: false,
    error: false
  },
  OUTDATED: {
    id: 'OUTDATED',
    loaded: true,
    loading: false,
    latest: false,
    error: false
  },
  SUCCESS: {
    id: 'SUCCESS',
    loaded: true,
    loading: false,
    latest: true,
    error: false
  },
}
