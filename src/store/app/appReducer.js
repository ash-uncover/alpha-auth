/* eslint-disable default-param-last, no-unused-vars */

import * as AppActions from './appActions'
import { produce } from 'immer'

export const initialState = () => ({})

// MAIN REDUCER //

const reducer = (baseState = initialState(), action) => {
  switch (action.type) {
    default: {
      return baseState
    }
  }
}

export default reducer
