const DataStates = {
  NEVER: {
    id: 'NEVER',
    loaded: false,
    loading: false,
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
  SUCCESS: {
    id: 'SUCCESS',
    loaded: true,
    loading: false,
    latest: true,
    error: false
  },
  FAILURE: {
    id: 'FAILURE',
    loaded: true,
    loading: false,
    latest: true,
    error: true
  },
  OUTDATED: {
    id: 'OUTDATED',
    loaded: true,
    loading: false,
    latest: false,
    error: false
  },
  FETCHING: {
    id: 'FETCHING',
    loaded: true,
    loading: true,
    latest: false,
    error: false
  }
}

export default DataStates
