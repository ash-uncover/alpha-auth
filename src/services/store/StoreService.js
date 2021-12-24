import {
  useDispatch,
  useEffect,
  useSelector
} from 'lib/hooks'

import {
  RestService
} from 'services'

import {
  selectors as AuthSelectors
} from 'store/auth'

import {
  selectors as UsersSelectors
} from 'store/rest/users'

const StoreService = {}

const useStoreData = (
  selectorData,
  selectorStatus,
  selectorError,
  apiCall,
  ...args
) => {
  const dispatch = useDispatch()

  const { token } = useSelector(AuthSelectors.selectLogonData)
  const data = useSelector(selectorData(...args))
  const status = useSelector(selectorStatus(...args))
  const error = useSelector(selectorError(...args))

  useEffect(() => {
    if (!status.loaded && !status.loading) {
      apiCall(dispatch, token, ...args)
    }
  })

  return {
    data,
    status,
    error
  }
}

StoreService.useUser = (userId) => {
  return useStoreData(
    UsersSelectors.selectUserData,
    UsersSelectors.selectUserStatus,
    UsersSelectors.selectUserError,
    RestService.api.users.get,
    userId
  )
}

StoreService.useUserRelations = (userId) => {
  return useStoreData(
    UsersSelectors.selectUserRelationsData,
    UsersSelectors.selectUserRelationsStatus,
    UsersSelectors.selectUserRelationsError,
    RestService.api.users.getRelations,
    userId
  )
}

export default StoreService
