import { useEffect } from 'react'
import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'

import { AppSlice } from './app/app.slice'
import { AuthSlice } from './auth/auth.slice'
import { RestSlice } from './rest/rest.slice'
import { IDataState } from '../lib/constants'
import { AuthSelectors } from './auth/auth.selectors'
import { UsersSelectors } from './rest/users/users.selectors'
import { UsersService } from '../services/rest/UsersService'

const useStoreData = (
  selectorData: (...any) => any,
  selectorStatus: (...any) => any,
  selectorError: (...any) => any,
  apiCall,
  ...args
) => {
  const dispatch = useDispatch()

  const data = useSelector(selectorData(...args))
  const status: IDataState = useSelector(selectorStatus(...args))
  const error = useSelector(selectorError(...args))

  useEffect(() => {
    if (!status.loaded && !status.loading) {
      apiCall(dispatch, ...args)
    }
  })

  return {
    data,
    status,
    error
  }
}

export const useUser = (userId: string) => {
  return useStoreData(
    UsersSelectors.userData,
    UsersSelectors.userStatus,
    UsersSelectors.userError,
    UsersService.getUser,
    userId
  )
}

export default configureStore({
  reducer: {
    app: AppSlice.reducer,
    auth: AuthSlice.reducer,
    rest: RestSlice,
  }
})
