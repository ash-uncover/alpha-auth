import {
  UsersSlice
} from '../../store/rest/users/users.slice'

import {
  Auth
} from './RestService'

const getUser = async (dispatch, id: string) => {
  dispatch(UsersSlice.actions.getUserFetch({ id }))
  return Auth.api.users.$userId.get(id)
    .then((user: any) => {
      dispatch(UsersSlice.actions.getUserSuccess({ id, user }))
    })
    .catch((error: any) => {
      dispatch(UsersSlice.actions.getUserFailure({ id, error }))
    })
}

const patchUser = async (dispatch, id: string, user: any) => {
  dispatch(UsersSlice.actions.patchUserFetch({ id }))
  return Auth.api.users.$userId.patch(id, user)
    .then((user: any) => {
      dispatch(UsersSlice.actions.patchUserSuccess({ id, user }))
    })
    .catch((error: any) => {
      dispatch(UsersSlice.actions.patchUserFailure({ id, error }))
    })
}

const postUserAvatar = async (dispatch, id: string, file: any) => {
  dispatch(UsersSlice.actions.postUserAvatarFetch({ id }))
  return Auth.api.users.$userId.avatar.post(id, file)
    .then(() => {
      dispatch(UsersSlice.actions.postUserAvatarSuccess({ id }))
    })
    .catch((error: any) => {
      dispatch(UsersSlice.actions.postUserAvatarFailure({ id, error }))
    })
}

export const UsersService = {
  getUser,
  patchUser,
  postUserAvatar,
}
