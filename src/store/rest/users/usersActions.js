export const USER_GET_FETCH = '@@USER/GET_FETCH'
export const USER_GET_SUCCESS = '@@USER/GET_SUCCESS'
export const USER_GET_FAILURE = '@@USER/GET_FAILURE'
export const userGetFetch = (id) => ({
  type: USER_GET_FETCH,
  payload: { id }
})
export const userGetSuccess = (id, user) => ({
  type: USER_GET_SUCCESS,
  payload: { id, user }
})
export const userGetFailure = (id, error) => ({
  type: USER_GET_FAILURE,
  payload: { id, error }
})
