export const USER_GET_FETCH = '@@USER/GET_FETCH'
export const USER_GET_SUCCESS = '@@USER/GET_SUCCESS'
export const USER_GET_FAILURE = '@@USER/GET_FAILURE'
export const userGetFetch = (id) => {
  return {
    type: USER_GET_FETCH,
    payload: { id }
  }
}
export const userGetSuccess = (user) => {
  return {
    type: USER_GET_SUCCESS,
    payload: { user }
  }
}
export const userGetFailure = (error) => {
  return {
    type: USER_GET_FAILURE,
    payload: { error }
  }
}
