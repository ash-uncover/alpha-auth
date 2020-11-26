/* eslint-disable default-param-last */

import { actions as AuthActions } from 'store/auth'
import { actions as UsersActions } from 'store/rest/users'
import { produce } from 'immer'

import {
  DataStates
} from 'lib/constants'

export const initialState = () => ({
  data: {},
  status: DataStates.NEVER,
  error: null
})

export const initialUserState = () => ({
  data: null,
  status: DataStates.NEVER,
  error: null,
  relationshipsData: null,
  relationshipsStatus: DataStates.NEVER,
  relationshipsError: null
})

export const getUserState = (state, id) => {
  if (!state.data[id]) {
    state.data[id] = initialUserState()
  }
  return state.data[id]
}

// USER GET REDUCER //

export const reduceUserGetFetch = (baseState, { id }) => {
  return produce(baseState, (state) => {
    const userState = getUserState(state, id)
    userState.error = null
    userState.status = DataStates.FETCHING
  })
}
export const reduceUserGetSuccess = (baseState, { id, user }) => {
  return produce(baseState, (state) => {
    const userState = getUserState(state, id)
    userState.data = user
    userState.error = null
    userState.status = DataStates.SUCCESS
  })
}
export const reduceUserGetFailure = (baseState, { id, error }) => {
  return produce(baseState, (state) => {
    const userState = getUserState(state, id)
    userState.data = null
    userState.error = error
    userState.status = DataStates.FAILURE
  })
}

// MAIN REDUCER //

const reducer = (baseState = initialState(), action) => {
  switch (action.type) {
    // Get /users/{userId}

    case UsersActions.USER_GET_FETCH: {
      return reduceUserGetFetch(baseState, action.payload)
    }
    case UsersActions.USER_GET_SUCCESS: {
      return reduceUserGetSuccess(baseState, action.payload)
    }
    case UsersActions.USER_GET_FAILURE: {
      return reduceUserGetFailure(baseState, action.payload)
    }

    // Logout

    case AuthActions.AUTH_LOGOUT_SUCCESS: {
      return initialState()
    }

    default: {
      return baseState
    }
  }
}

export default reducer
