import { Dispatch } from 'react'
import { AnyAction } from '@reduxjs/toolkit'

import {
  Auth
} from './RestService'

import {
  AppSlice
} from '../../store/app/app.slice'

export const checkHealth = async (dispatch: Dispatch<AnyAction>) => {
  dispatch(AppSlice.actions.checkHealthFetch())
  try {
    await Auth.api.health.get()
    dispatch(AppSlice.actions.checkHealthSuccess())

  } catch (error) {
    dispatch(AppSlice.actions.checkHealthFailure())
  }
}

export const AppService = {
  checkHealth,
}
